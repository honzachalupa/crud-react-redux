import getUrlParameter from './getUrlParameter';

export default (name) => {
    return Number(getUrlParameter('id'));
};
