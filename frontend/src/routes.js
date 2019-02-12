import Schedule from "./pages/Schedule/Schedule";
import Login from "./pages/Login/Login";
import AccountPage from "./pages/Account/Account";
import Courses from "./pages/Courses/Courses";
import Teachers from "./pages/Teachers/Teachers";
import Managers from "./pages/Managers/Managers";
import Learners from "./pages/Learners/Learners";
import Groups from "./pages/Groups/Groups";
import Payment from "./pages/Payment/Payment";

export const routes = [
    {
        path: '/',
        exact: true,
        title: 'Расписание',
        Component: Schedule
    },
    {
        path: '/signin',
        title: '',
        Component: Login
    },
    {
        path: '/account',
        title: "Настройки аккаунта",
        Component: AccountPage
    },
    {
        path: '/courses',
        title: "Курсы",
        Component: Courses
    },
    {
        path: '/groups',
        title: "Группы",
        Component: Groups
    },
    {
        path: '/teachers',
        title: "Преподаватели",
        Component: Teachers
    },
    {
        path: '/managers',
        title: "Менеджеры",
        Component: Managers
    },
    {
        path: '/learners',
        title: "Ученики",
        Component: Learners
    },
    {
        path: '/payment',
        title: "Оплата",
        Component: Payment
    },
    {
        path: '/sales',
        title: "Акции",
        Component: Schedule
    },
];
