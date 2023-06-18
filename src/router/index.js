import AdminPage from "../page/AdminPage";
import AuthPage from "../page/AuthPage";
import TicketGeneratorPage from "../page/TicketGeneratorPage";

/* Объявление пользовательских путей для навигации по приложению */
export const ADMIN_ROUTE = '/admin';
export const TICKET_GENERATOR_ROUTE = '/ticket-generator';
export const LOGIN_ROUTE = '/login';
export const REGISTRATION_ROUTE = '/registration';

/* Распределние по доступу(роль пользователя), и привязка соответствующих страниц */
export const adminRoutes = [
    {path: ADMIN_ROUTE, Component: AdminPage, label: "Панель Администратора"},
];
export const userRoutes = [
    {path: TICKET_GENERATOR_ROUTE, Component: TicketGeneratorPage, label: "Генератор билетов"},
];
export const publicRoutes = [
    {path: LOGIN_ROUTE, Component: AuthPage, label: "Вход"},
    {path: REGISTRATION_ROUTE, Component: AuthPage, label: "Регистрация"},
];