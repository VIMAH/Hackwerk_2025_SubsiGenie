// Wallet Credentials Types
export interface WalletCredential {
    id: string;
    type: string;
    issuer: string;
    issuedAt: string;
    expiresAt?: string;
    credentialSubject: Record<string, any>;
}

export interface AuthenticationCredential extends WalletCredential {
    type: "AuthenticationCredential";
    credentialSubject: {
        authentication: string;
    };
}

export interface BusinessCredential extends WalletCredential {
    type: "BusinessCredential";
    credentialSubject: {
        kvkNumber: string;
        statutoryName: string;
        rsin: string;
        establishmentNumber: string;
        tradeName: string;
        businessAddress: {
            street: string;
            city: string;
            postalCode: string;
            country: string;
        };
        email: string;
        sbiCode: string;
        legalForm: string;
        employeeCount: number;
        iban: string;
        contactPerson: {
            name: string;
            email: string;
            phone: string;
        };
    };
}

export interface MkbDeclarationCredential extends WalletCredential {
    type: "MkbDeclarationCredential";
    credentialSubject: {
        mkbDeclaration: boolean;
    };
}

export interface PreviousExporterCredential extends WalletCredential {
    type: "PreviousExporterCredential";
    credentialSubject: {
        previousExporterApplications: string[];
    };
}

export interface DeMinimisCredential extends WalletCredential {
    type: "DeMinimisCredential";
    credentialSubject: {
        deMinimisRoom: number;
    };
}

// RVO Requirements Types
export interface RvoRequirements {
    requestedCredentials: string[];
    additionalInformation: string[];
}

export interface RvoResponse {
    requirements: RvoRequirements;
    message: string;
}

// Additional Information Types
export interface AdditionalInformation {
    projectLocationDHI?: string;
    mkbDeclaration?: boolean;
    previousExporterApplications?: string[];
    deMinimisRoom?: number;
    applicantRole?: string;
    applicationTypeOrConsortium?: string;
    demonstration?: string;
    feasibility?: string;
    investmentPreparation?: string;
    projectDetails?: string;
    targetSector?: string;
    greeningCheck?: boolean;
    startDate?: string;
    endDate?: string;
    financialTurnoverMin100kLast3Years?: boolean;
    exportMultiplierStatement?: string;
    onHostLocation?: boolean;
    exportedBefore?: boolean;
    performedQuickScan?: boolean;
}

// Draft and Attestation Types
export interface ApplicationDraft {
    id: string;
    walletCredentials: WalletCredential[];
    additionalInformation: AdditionalInformation;
    missingFields: string[];
    status: "draft" | "complete" | "submitted";
    createdAt: string;
    updatedAt: string;
}

export interface Attestation {
    id: string;
    type: "DhiSubsidyApplication";
    issuer: string;
    issuedAt: string;
    credentialSubject: {
        walletCredentials: WalletCredential[];
        additionalInformation: AdditionalInformation;
        applicationId: string;
    };
    proof: {
        type: "JwtProof2020";
        jwt: string;
    };
}

export interface RvoSubmission {
    attestation: Attestation;
    documents: any[];
    submittedAt: string;
    status: "submitted" | "approved" | "rejected";
}

// API Request/Response Types
export interface StartApplicationRequest {
    entrepreneurId: string;
}

export interface StartApplicationResponse {
    applicationId: string;
    requirements: RvoRequirements;
    availableCredentials: string[];
    missingCredentials: string[];
}

export interface DraftRequest {
    applicationId: string;
    availableCredentials: WalletCredential[];
}

export interface DraftResponse {
    draft: ApplicationDraft;
    missingFields: string[];
}

export interface CompleteApplicationRequest {
    applicationId: string;
    additionalInformation: AdditionalInformation;
}

export interface CompleteApplicationResponse {
    draft: ApplicationDraft;
    attestation: Attestation;
}

export interface ConfirmAttestationRequest {
    applicationId: string;
    pin: string;
}

export interface ConfirmAttestationResponse {
    success: boolean;
    attestation: Attestation;
}

export interface SubmitToRvoRequest {
    applicationId: string;
    attestation: Attestation;
}

export interface SubmitToRvoResponse {
    success: boolean;
    submission: RvoSubmission;
}

// Dashboard Types
export interface DashboardData {
    availableCredentials: WalletCredential[];
    missingCredentials: string[];
    recentApplications: ApplicationDraft[];
    canStartApplication: boolean;
}

// Error Types
export interface ApiError {
    error: string;
    message: string;
    statusCode: number;
}


