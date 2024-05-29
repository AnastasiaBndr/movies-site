import { useDispatch, useSelector } from 'react-redux';
import { selectLanguage, setLanguage } from '../../redux/global/globalSlice';

import {
    StyledLanguageToggleList,
    StyledLanguageToggleListItem,
    StyledLanguageToggleListButton,
} from './LanguageToggle.styled';

import i18n from '../../components/configs/i18n';

const LANGUGES = [
    { name: 'EN', code: 'en-US' },
    { name: 'UA', code: 'uk-UKR' },
];

const LanguageToggle = () => {
    const dispatch = useDispatch();
    const currentLang = useSelector(selectLanguage);

    const handleLangChange = lang => {
        dispatch(setLanguage(lang));
        i18n.changeLanguage(lang);
    };

    return (
        <StyledLanguageToggleList>
            {LANGUGES.map(language => {
                return (
                    <StyledLanguageToggleListItem key={language.code}>
                        <StyledLanguageToggleListButton
                            onClick={() => handleLangChange(language.code)}
                            $active={currentLang === language.code}
                        >
                            {language.name}
                        </StyledLanguageToggleListButton>
                    </StyledLanguageToggleListItem>
                );
            })}
        </StyledLanguageToggleList>
    );
};

export default LanguageToggle;