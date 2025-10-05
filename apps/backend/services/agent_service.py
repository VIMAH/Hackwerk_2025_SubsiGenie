import os
import json
from typing import Dict, List, Any, Optional
from langchain_openai import ChatOpenAI
from langchain.schema import HumanMessage, SystemMessage
from langchain.prompts import ChatPromptTemplate
from langchain.chains import LLMChain
from langchain.output_parsers import PydanticOutputParser
from langchain.callbacks import StreamingStdOutCallbackHandler
from pydantic import BaseModel, Field

class ApplicationDraft(BaseModel):
    """Pydantic model for structured draft output"""
    walletCredentials: List[Dict[str, Any]] = Field(description="List of wallet credentials used")
    additionalInformation: Dict[str, Any] = Field(description="Additional information provided")
    missingFields: List[str] = Field(description="List of missing field names")
    guidance: Dict[str, str] = Field(description="Guidance for each missing field")
    status: str = Field(default="draft", description="Draft status")

class AgentService:
    def __init__(self):
        # Initialize LLM with streaming and better configuration
        self.llm = ChatOpenAI(
            model="gpt-4-1106-preview",  # GPT-4.1-mini equivalent
            api_key=os.getenv("OPENAI_API_KEY"),
            temperature=0.1,
            streaming=True,
            callbacks=[StreamingStdOutCallbackHandler()]
        )
        
        # Initialize output parser for structured responses
        self.output_parser = PydanticOutputParser(pydantic_object=ApplicationDraft)
        
        self.draft_prompt = ChatPromptTemplate.from_messages([
            ("system", """You are an AI agent helping entrepreneurs apply for DHI subsidies. 
            Your task is to create a comprehensive application draft using available wallet credentials 
            and identifying missing information that the entrepreneur needs to provide.
            
            Available credentials: {available_credentials}
            Additional requirements: {additional_requirements}
            
            Create a structured draft that:
            1. Uses all available credential data
            2. Identifies missing fields clearly
            3. Provides guidance for completing missing information
            4. Follows the DHI application format
            
            {format_instructions}"""),
            ("human", "Create a draft application using the provided data.")
        ])
        
        self.update_prompt = ChatPromptTemplate.from_messages([
            ("system", """You are updating a DHI subsidy application draft with new information provided by the entrepreneur.
            
            Current draft: {current_draft}
            New information: {new_information}
            
            Update the draft by:
            1. Merging new information with existing data
            2. Resolving conflicts (prefer wallet data if valid, otherwise use manual input)
            3. Updating missing fields list
            4. Ensuring data consistency
            
            Return the updated draft as JSON."""),
            ("human", "Update the application draft with the new information.")
        ])

    async def create_draft(self, application_id: str, available_credentials: List[Dict], additional_requirements: List[str]) -> Dict[str, Any]:
        """Create AI-generated draft using available credentials and requirements"""
        try:
            # Prepare data for LLM
            credentials_summary = self._summarize_credentials(available_credentials)
            
            # Create chain with output parser
            chain = LLMChain(
                llm=self.llm, 
                prompt=self.draft_prompt,
                output_parser=self.output_parser
            )
            
            # Generate draft with structured output
            response = await chain.arun(
                available_credentials=credentials_summary,
                additional_requirements=additional_requirements,
                format_instructions=self.output_parser.get_format_instructions()
            )
            
            # Parse structured response
            if isinstance(response, ApplicationDraft):
                draft_data = response.dict()
            else:
                # Fallback to JSON parsing
                draft_data = json.loads(str(response))
            
            # Add metadata
            draft = {
                "id": f"draft_{application_id}",
                "applicationId": application_id,
                "walletCredentials": available_credentials,
                "additionalInformation": draft_data.get("additionalInformation", {}),
                "missingFields": draft_data.get("missingFields", []),
                "guidance": draft_data.get("guidance", {}),
                "status": "draft",
                "createdAt": "2024-01-01T00:00:00Z",
                "updatedAt": "2024-01-01T00:00:00Z"
            }
            
            return draft
            
        except Exception as e:
            print(f"Error in create_draft: {e}")
            # Fallback draft creation
            return self._create_fallback_draft(application_id, available_credentials, additional_requirements)

    async def update_draft(self, application_id: str, additional_information: Dict[str, Any]) -> Dict[str, Any]:
        """Update draft with entrepreneur-provided information"""
        try:
            # In a real implementation, you'd fetch the current draft
            current_draft = {
                "walletCredentials": [],
                "additionalInformation": {},
                "missingFields": []
            }
            
            # Create chain
            chain = LLMChain(llm=self.llm, prompt=self.update_prompt)
            
            # Update draft
            response = await chain.arun(
                current_draft=json.dumps(current_draft),
                new_information=json.dumps(additional_information)
            )
            
            # Parse and return updated draft
            updated_draft = json.loads(response)
            updated_draft["id"] = f"draft_{application_id}"
            updated_draft["applicationId"] = application_id
            updated_draft["status"] = "complete"
            updated_draft["updatedAt"] = "2024-01-01T00:00:00Z"
            
            return updated_draft
            
        except Exception as e:
            # Fallback update
            return self._create_fallback_update(application_id, additional_information)

    def _summarize_credentials(self, credentials: List[Dict]) -> str:
        """Summarize credentials for LLM processing"""
        summary = []
        for cred in credentials:
            cred_type = cred.get("type", "Unknown")
            subject = cred.get("credentialSubject", {})
            summary.append(f"{cred_type}: {json.dumps(subject, indent=2)}")
        return "\n".join(summary)

    def _create_fallback_draft(self, application_id: str, available_credentials: List[Dict], additional_requirements: List[str]) -> Dict[str, Any]:
        """Create a fallback draft when LLM fails"""
        return {
            "id": f"draft_{application_id}",
            "applicationId": application_id,
            "walletCredentials": available_credentials,
            "additionalInformation": {},
            "missingFields": additional_requirements,
            "guidance": {req: f"Please provide information for: {req}" for req in additional_requirements},
            "status": "draft",
            "createdAt": "2024-01-01T00:00:00Z",
            "updatedAt": "2024-01-01T00:00:00Z"
        }

    def _create_fallback_update(self, application_id: str, additional_information: Dict[str, Any]) -> Dict[str, Any]:
        """Create a fallback update when LLM fails"""
        return {
            "id": f"draft_{application_id}",
            "applicationId": application_id,
            "walletCredentials": [],
            "additionalInformation": additional_information,
            "missingFields": [],
            "status": "complete",
            "createdAt": "2024-01-01T00:00:00Z",
            "updatedAt": "2024-01-01T00:00:00Z"
        }

