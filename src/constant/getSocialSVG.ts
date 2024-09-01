import { FaceBookSVG, InstagramSVG, LinkedInSVG, TwitterSVG, WebsiteSVG } from '../../assets/icons';
import { FaceBookMedSVG, InstagramMedSVG, LinkedInMedSVG, TwitterMedSVG, WebsiteMedSVG } from '../../assets/icons/contact-us-icons';

export const getSocialSVG = (slug: string, isMedIcons?: boolean) => {
    switch (slug) {
        case 'facebook':
            return isMedIcons ? FaceBookMedSVG : FaceBookSVG;
        case 'instagram':
            return isMedIcons ? InstagramMedSVG : InstagramSVG;
        case 'linkedin':
            return isMedIcons ? LinkedInMedSVG : LinkedInSVG;
        case 'twitter':
            return isMedIcons ? TwitterMedSVG : TwitterSVG;
        default:
            return isMedIcons ? WebsiteMedSVG : WebsiteSVG;
    }
};