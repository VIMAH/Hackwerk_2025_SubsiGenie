// Re-export types from shared schema package
export * from '@entrepreneur-ai/schemas'

// Dashboard types
export interface DashboardData {
    availableCredentials: Array<{
        type: string
        status: 'verified' | 'pending' | 'expired'
    }>
    missingCredentials: string[]
    recentApplications: Array<{
        id: string
        title: string
        status: 'draft' | 'submitted' | 'approved' | 'rejected'
        createdAt: string
    }>
    canStartApplication: boolean
}

