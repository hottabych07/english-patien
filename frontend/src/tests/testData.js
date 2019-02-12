
export const teachers = [
    {
        id: 1,
        name: 'Галина Петровна',
        email: 'galina@gmail.com'
    },
    {
        id: 2,
        name: 'Елена Павловна',
        email: 'pavlovna@gmail.com'
    },
    {
        id: 3,
        name: 'Алексей Михайлович',
        email: 'bamihailovi4@gmail.com'
    },
    {
        id: 4,
        name: 'Валентина Германовна',
        email: 'germonovna@gmail.com'
    },
    {
        id: 5,
        name: 'Григорий Потапенко',
        email: 'potapenko@gmail.com'
    },
    {
        id: 6,
        name: 'Валерия Смоленская',
        email: 'galina@gmail.com'
    },
    {
        id: 7,
        name: 'Ирина Витальевна',
        email: 'pavlovna@gmail.com'
    },
    {
        id: 8,
        name: 'Мария Федоровна',
        email: 'bamihailovi4@gmail.com'
    },
    {
        id: 9,
        name: 'Галина Николаевна',
        email: 'germonovna@gmail.com'
    },
    {
        id: 10,
        name: 'Максим Григорьев',
        email: 'potapenko@gmail.com'
    }
];

export const groups = [
    {
        id: 1,
        name: '1451',
        students: [],
    },
    {
        id: 2,
        name: '1452',
        students: [],
    },
    {
        id: 3,
        name: '1453',
        students: [],
    },
    {
        id: 4,
        name: '1454',
        students: [],
    },
]

export const courses = [
    {
        id: 1,
        title: 'Лингвистический анализ',
        description: 'Это описание курса Лингвистического анализа',
        teachers: [
            1,
            4,
        ],
        date_from: '2018-12-15',
        date_to: '2019-05-16',
        groups: [
            2,
            3
        ],
        lessons: [

        ]
    },
    {
        id:2,
        title: 'Введение в симфолику фраз',
        description: 'Что то про введение в симфолику фраз',
        teachers: [
            2,
            3,
        ],
        date_from: '2018-12-20',
        date_to: '2019-03-11',
        groups: [
            1,
            4
        ],
        lessons: [

        ]
    }
];

export const lessons = [
    {
        id: 340,
        course: 1,
        groups: [
            3
        ],
        teacher: 1,
        date: '2019-01-15',
        time_from: '8:45:00',
        time_to: '10:35:00',
        type: 0,
        location: '26 ауд.',
        bgColor: "#d90008"
    },
    {
        id: 341,
        course: 1,
        groups: [
            2
        ],
        teacher: 4,
        date: '2019-01-16',
        time_from: '10:35:00',
        time_to: '12:25:00',
        type: 1,
        location: '14 ауд.',
        bgColor: "#d90008"
    },
    {
        id: 342,
        course: 1,
        groups: [
            2,
            3
        ],
        teacher: 1,
        date: '2019-02-05',
        time_from: '10:35:00',
        time_to: '12:25:00',
        type: 2,
        location: '36 ауд.',
        bgColor: "#d90008"
    },
    {
        id: 343,
        course: 2,
        groups: [
            1
        ],
        teacher: 2,
        date: '2019-01-08',
        time_from: '10:35:00',
        time_to: '12:25:00',
        type: 3,
        location: '207 ауд.',
        bgColor: "#d90008"
    },
    {
        id: 344,
        course: 2,
        groups: [
            1,
            4
        ],
        teacher: 3,
        date: '2019-01-20',
        time_from: '10:35:00',
        time_to: '12:25:00',
        type: 4,
        location: '306 ауд.',
        bgColor: "#d90008"
    }
];