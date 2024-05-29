import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: false,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en: {
        translation: {
          user_settings: {
            language: 'Language',
            languages: {
              english: 'English',
              ukrainian: 'Ukrainian',
            },
          },
          header: {
            popular: 'Popular',
            login: 'Log in',
            go_back: 'Go back',
            watch_now: 'Watch now!',
          },
          side_bar: {
            here_may_be_your_name: 'Here may be your name ;)',
            home: 'Home',
            favorite: 'Favorite',
            dropped: 'Dropped',
            watching: 'Watching',
            finished: 'finished',
            profile: 'Profile',
            search_placeholder: 'Search movie or tv',
            logout: 'log out',
          },
          current_movie_page: {
            favorite: 'Favorite',
            dropped: 'Dropped',
            watching: 'Watching',
            finished: 'finished',
            language: 'Language',
            popularity: 'Popularity',
            vote_average: 'Vote average',
            first_air_date: 'First air date',
            reviews: 'Reviews',
            trailer: 'Trailer',
            country: 'Country',
            you_may_also_like: 'You may also like',
          },
          list_page: {
            tranding_now: 'Tranding now',
            search_result: 'Search result for',
          },
        },
      },
      uk: {
        translation: {
          user_settings: {
            language: 'Language',
            languages: {
              english: 'English',
              ukrainian: 'Ukrainian',
            },
          },
          header: {
            popular: 'Популярне',
            login: 'Логін',
            go_back: 'Назад',
            watch_now: 'Дивіться зараз!',
          },
          side_bar: {
            here_may_be_your_name: 'Тут може бути ваше ім`я :)',
            home: 'Дім',
            favorite: 'Улюблене',
            dropped: 'Покинуто',
            watching: 'Переглядаю',
            finished: 'Завершено',
            profile: 'Профіль',
            search_placeholder: 'Пошук фільму',
            logout: 'Вихід',
          },
          current_movie_page: {
            favorite: 'Улюблене',
            dropped: 'Покинуто',
            watching: 'Переглядаю',
            finished: 'Завершено',
            language: 'Мова оригіналу',
            popularity: 'Популярність',
            vote_average: 'Середня оцінка',
            first_air_date: 'Дата виходу',
            reviews: 'Відгуки',
            trailer: 'Трейлер',
            country: 'Країна',
            you_may_also_like: 'Вам також може сподобатись',
          },
          list_page: {
            tranding_now: 'Популярне зараз',
            search_result: 'Результат пошуку для',
          },
        },
      },
    },
  });

export default i18n;
