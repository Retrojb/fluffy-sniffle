export type exportToUrlSettings = {
    url: string,
    accessToken: string,
    acceptHeaders: string,
    authType: string,
    content: string,
    reference: string
};

export type exportToUrlRequest = {
    payload: {
        designTokens: string,
        fileName: string
    }
};