import React, { createContext, useContext, useState } from "react";

export type Language = "ru" | "uz" | "en";

export const translations = {
  ru: {
    nav: {
      events: "Мероприятия",
      community: "Сообщество",
      projects: "Проекты",
      mentors: "Менторы",
      about: "О нас",
      login: "Войти",
      signup: "Регистрация",
      profile: "Личный кабинет",
      home: "Главная"
    },
    landing: {
      heroTitle1: "Расширяем возможности девушек.",
      heroTitle2: "Строим будущее.",
      heroDesc:
        "SWITCH — это сообщество для девушек, которые хотят учиться, создавать и запускать стартап-проекты.",
      joinBtn: "Присоединиться",
      eventsBtn: "Мероприятия",
      noEvents: "Мероприятий пока нет — загляните позже.",  
      stats: {
        members: "Участниц",
        events: "Мероприятий",
        projects: "Проектов",
        mentors: "Менторов",
      },
      upcomingTitle: "Предстоящие мероприятия",
      upcomingSub: "Присоединяйся к нашим воркшопам, буткемпам и питч-дням",
      viewAll: "Смотреть все",
      viewDetails: "Подробнее",
      goToProfile: "Перейти в личный кабинет",
    },
    auth: {
      loginTitle: "С возвращением!",
      loginSubtitle: "Войдите в аккаунт SWITCH Community",
      registerTitle: "Присоединяйся к SWITCH",
      registerSubtitle: "Создай аккаунт и развивай свои стартапы",
      email: "Email адрес",
      password: "Пароль",
      firstName: "Имя",
      lastName: "Фамилия",
      phone: "Номер телефона",
      telegram: "Telegram username",
      loginBtn: "Войти в аккаунт",
      registerBtn: "Зарегистрироваться",
      noAccount: "Ещё нет аккаунта?",
      hasAccount: "Уже есть аккаунт?",
      signUpLink: "Зарегистрироваться",
      signInLink: "Войти",
      rememberMe: "Запомнить меня",
      forgotPassword: "Забыли пароль?",
      acceptTerms:
        "Я принимаю Условия использования и Политику конфиденциальности",
      backHome: "Вернуться на главную",
    },
    eventDetails: {
      notFound: "Мероприятие не найдено",
      errorMsg: "Ошибка при загрузке данных",
      regFailed: "Не удалось зарегистрироваться",
      regError: "Ошибка регистрации",
      goHome: "Вернуться на главную",
      backBtn: "Назад к списку мероприятий",
      seatsLeft: "Осталось мест",
      participants: "Участники",
      loading: "Загрузка...",
      registeredBadge: "Вы зарегистрированы",
      registerBtn: "Зарегистрироваться",
      shareBtn: "Поделиться",
      aboutTitle: "О мероприятии",
      speakersTitle: "Спикеры",
      yourTicket: "Ваш билет",
      ticketConfirmed: "Билет подтвержден",
      downloadTicket: "Скачать билет",
      ticketTitle: "Электронный билет",
      ticketInstruction:
        "Зарегистрируйтесь, чтобы получить персональный билет с QR-кодом.",
      speakerRole: "Спикер",
    },
    theme: { light: "Светлая", dark: "Тёмная", device: "Системная" },
  },
  uz: {
    nav: {
      events: "Tadbirlar",
      community: "Hamjamiyat",
      projects: "Loyihalar",
      mentors: "Mentorlar",
      about: "Biz haqimizda",
      login: "Kirish",
      signup: "Ro'yxatdan o'tish",
      profile: "Shaxsiy kabinet",
      home: "Bosh sahifa"
    },
    landing: {
      heroTitle1: "Qizlar imkoniyatlarini kengaytiramiz.",
      heroTitle2: "Kelajakni barpo etamiz.",
      heroDesc:
        "SWITCH — bu o'rganish, yaratish va startap loyihalarni yo'lga qo'yishni xohlaydigan qizlar hamjamiyati.",
      joinBtn: "Hamjamiyatga qo'shilish",
      eventsBtn: "Kutilayotgan tadbirlar",
      noEvents: "Hozircha tadbirlar mavjud emas — keyinroq qaytib keling.",
      stats: {
        members: "A'zolar",
        events: "Tadbirlar",
        projects: "Loyihalar",
        mentors: "Mentorlar",
      },
      upcomingTitle: "Kutilayotgan tadbirlar",
      upcomingSub: "Vorkshoplar, butkemplar va pitch kunlarimizda qatnashing",
      viewAll: "Barchasini ko'rish",
      viewDetails: "Batafsil",
      goToProfile: "Shaxsiy kabinetga o‘tish",
    },
    auth: {
      loginTitle: "Xush kelibsiz!",
      loginSubtitle: "SWITCH Community hisobingizga kiring",
      registerTitle: "SWITCH'ga qo'shiling",
      registerSubtitle:
        "Hisob yarating va o'z startaplaringizni rivojlantiring",
      email: "Email manzili",
      password: "Parol",
      firstName: "Ism",
      lastName: "Familiya",
      phone: "Telefon raqami",
      telegram: "Telegram foydalanuvchi nomi",
      loginBtn: "Tizimga kirish",
      registerBtn: "Ro'yxatdan o'tish",
      noAccount: "Hali hisobingiz yo‘qmi?",
      hasAccount: "Hisobingiz bormi?",
      signUpLink: "Ro'yxatdan o'tish",
      signInLink: "Kirish",
      rememberMe: "Meni eslab qol",
      forgotPassword: "Parolni unutdingizmi?",
      acceptTerms: "Men Foydalanish shartlari va Maxfiylik siyosatiga roziman",
      backHome: "Bosh sahifaga qaytish",
    },
    eventDetails: {
      notFound: "Tadbir topilmadi",
      errorMsg: "Ma'lumotlar yuklanayotganda xato yuz berdi",
      regFailed: "Ro'yxatdan o'tish imkoniyati yo'q",
      regError: "Ro'yxatdan o'tish xatosi",
      goHome: "Bosh sahifaga qaytish",
      backBtn: "Tadbir topilmadi",
      seatsLeft: "Qolgan o‘rinlar",
      participants: "Ishtirokchilar",
      loading: "Yuklanmoqda...",
      registeredBadge: "Siz ro'yxatdan o'tdingiz",
      registerBtn: "Ro'yxatdan o'tish",
      shareBtn: "Bo'lishish",
      aboutTitle: "Tadbir haqida",
      speakersTitle: "Speakerlar",
      yourTicket: "Sizning chiptangiz",
      ticketConfirmed: "Chipta tasdiqlandi",
      downloadTicket: "Chiptani yuklab olish",
      ticketTitle: "Elektron chipta",
      ticketInstruction:
        "Shaxsiy QR-kodli chiptani olish uchun, ro'yxatdan o'ting ",
      speakerRole: "Speaker",
    },
    theme: { light: "Yorug‘", dark: "Qorong‘i", device: "Tizim" },
  },
  en: { 
    nav: {
      events: "Events",
      community: "Community",
      projects: "Projects",
      mentors: "Mentors",
      about: "About",
      login: "Log In",
      signup: "Sign Up",
      profile: "Profile",
      home: "Home"
    },
    landing: {
      heroTitle1: "Empowering Girls.",
      heroTitle2: "Building Futures.",
      heroDesc:
        "SWITCH is a community for girls who want to learn, build, and launch startup projects.",
      joinBtn: "Join Community",
      eventsBtn: "Upcoming Events",
      noEvents: "No events available at the moment — check back later.",
      stats: {
        members: "Members",
        events: "Events",
        projects: "Projects",
        mentors: "Mentors",
      },
      upcomingTitle: "Upcoming Events",
      upcomingSub: "Join our workshops, session bootcamps and pitch days",
      viewAll: "View All",
      viewDetails: "View Details",
      goToProfile: "Go to Profile",
    },
    auth: {
      loginTitle: "Welcome Back!",
      loginSubtitle: "Log in to your SWITCH Community account",
      registerTitle: "Join SWITCH",
      registerSubtitle: "Create an account and launch your startup projects",
      email: "Email address",
      password: "Password",
      firstName: "First Name",
      lastName: "Last Name",
      phone: "Phone number",
      telegram: "Telegram username",
      loginBtn: "Log In",
      registerBtn: "Create Account",
      noAccount: "Don't have an account?",
      hasAccount: "Already have an account?",
      signUpLink: "Sign Up",
      signInLink: "Log In",
      rememberMe: "Remember me",
      forgotPassword: "Forgot password?",
      acceptTerms: "I agree to the Terms of Service and Privacy Policy",
      backHome: "Back to Home",
    },
    eventDetails: {
      notFound: "Event not found",
      errorMsg: "Error loading data",
      regFailed: "Registration failed",
      regError: "Registration error",
      goHome: "Go to Home",
      backBtn: "Back",
      seatsLeft: "Seats left",
      participants: "Participants",
      loading: "Loading...",
      registeredBadge: "You are registered",
      registerBtn: "Register",
      shareBtn: "Share",
      aboutTitle: "About the Event",
      speakersTitle: "Speakers",
      yourTicket: "Your Ticket",
      ticketConfirmed: "Ticket Confirmed",
      downloadTicket: "Download Ticket",
      ticketTitle: "Electronic Ticket",
      ticketInstruction:
        "Sign up to receive a personalized ticket with a QR code.",
      speakerRole: "Speaker",
    },
    
    theme: { light: "Light", dark: "Dark", device: "Device" },
  },
};

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (typeof translations)["ru"];
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [lang, setLang] = useState<Language>(() => {
    return (localStorage.getItem("switch_lang") as Language) || "ru";
  });

  const handleSetLang = (newLang: Language) => {
    setLang(newLang);
    localStorage.setItem("switch_lang", newLang);
  };

  return (
    <LanguageContext.Provider
      value={{ lang, setLang: handleSetLang, t: translations[lang] }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLang = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLang must be used within LanguageProvider");
  return context;
};
