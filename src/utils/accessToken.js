var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const getAccessToken = (figmaFileId) => __awaiter(void 0, void 0, void 0, function* () {
    const accessTokens = yield figma.clientStorage.getAsync('accessTokens');
    if (accessTokens !== undefined && accessTokens instanceof Object) {
        const accessToken = accessTokens[figmaFileId];
        return accessToken || '';
    }
    return '';
});
const setAccessToken = (figmaFileId, accessToken) => __awaiter(void 0, void 0, void 0, function* () {
    const accessTokens = yield figma.clientStorage.getAsync('accessTokens');
    const mergedTokens = Object.assign(Object.assign({}, accessTokens), { [figmaFileId]: accessToken });
    return yield figma.clientStorage.setAsync('accessTokens', mergedTokens);
});
export { getAccessToken, setAccessToken };
