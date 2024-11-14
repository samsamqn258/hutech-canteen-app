import { useSelector } from 'react-redux';

const useToken = () => {
    return useSelector((state) => state.auth.user.metaData.token.accessToken);
};

export default useToken;
