import { FaceBookSVG, InstagramSVG, LinkedInSVG, XSVG, WebsiteSVG } from '../../assets/icons';
import { FaceBookMedSVG, InstagramMedSVG, LinkedInMedSVG, XMedSVG, WebsiteMedSVG } from '../../assets/icons/contact-us-icons';

export const getSocialSVG = (slug: string, isMedIcons?: boolean) => {
    switch (slug) {
        case 'facebook':
            return isMedIcons ? FaceBookMedSVG : FaceBookSVG;
        case 'instagram':
            return isMedIcons ? InstagramMedSVG : InstagramSVG;
        case 'linkedin':
            return isMedIcons ? LinkedInMedSVG : LinkedInSVG;
        case 'twitter':
            return isMedIcons ? XMedSVG : XSVG;
        case 'x':
            return isMedIcons ? XMedSVG : XSVG;
        default:
            return isMedIcons ? WebsiteMedSVG : WebsiteSVG;
    }
};