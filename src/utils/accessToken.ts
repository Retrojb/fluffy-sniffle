const getAccessToken = async (figmaFileId: string) => {
    const accessTokens = await figma.clientStorage.getAsync('accessTokens')

    if(accessTokens !== undefined && accessTokens instanceof Object) {
        const accessToken = accessTokens[figmaFileId];
        return accessToken || '';
    }
    return '';
};

const setAccessToken = async (figmaFileId: string, accessToken: string) => {
    const accessTokens = await figma.clientStorage.getAsync('accessTokens');
    const mergedTokens = {
        ...accessTokens,
        ...{ [figmaFileId]: accessToken }
    };
    return await figma.clientStorage.setAsync('accessTokens', mergedTokens);
};

export { getAccessToken, setAccessToken }