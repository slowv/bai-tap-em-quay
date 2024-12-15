import {setData, formatDate, UUID, getData} from '../util.js'

const users = [
    {
        id: UUID(),
        firstname: 'Trịnh',
        lastname: 'Việt',
        email: 'quocviet.hn98@gmail.com',
        password: 'Viet1998',
    },
    {
        id: UUID(),
        firstname: 'Phạm',
        lastname: 'Dương',
        email: 'duongph@smartosc.com',
        password: '123456',
    },
    {
        id: UUID(),
        firstname: 'Dương',
        lastname: 'Anh',
        email: 'anhdq@smartosc.com',
        password: '123456',
    }
];

const posts = [
    {
        id: UUID(),
        title: 'Choreography-based Saga',
        content: 'Mỗi microservice tham gia vào Saga tự quyết định khi nào sẽ hành động dựa trên các sự kiện mà nó nhận được từ các dịch vụ khác.',
        image: 'https://miro.medium.com/v2/resize:fit:1400/1*ZDszFKdY4MFLJN9z7uA7LA.png',
        createdAt: formatDate(new Date()),
        updatedAt: formatDate(new Date()),
        userId: users[0].id,
    },
    {
        id: UUID(),
        title: 'Orchestration-based Saga',
        content: 'Có một dịch vụ điều phối trung tâm (Orchestrator) chịu trách nhiệm quản lý và điều phối toàn bộ quy trình của Saga',
        image: 'https://miro.medium.com/v2/resize:fit:1400/1*b4fFk1k5PfPdI3mAC1Rskg.png',
        createdAt: formatDate(new Date()),
        updatedAt: formatDate(new Date()),
        userId: users[1].id,
    },
    {
        id: UUID(),
        title: 'Saga pattern',
        content: 'Choreography-based Saga (Saga Dựa trên Biên đạo), Orchestration-based Saga (Saga Dựa trên Điều phối)',
        image: 'https://i0.wp.com/mia-platform.eu/wp-content/uploads/Mia-Platform_Saga_Pattern-1.png',
        createdAt: formatDate(new Date()),
        updatedAt: formatDate(new Date()),
        userId: users[2].id,
    }
]

if (!getData('users')){
    setData('users', users);
}

if (!getData('posts')) {
    setData('posts', posts);
}