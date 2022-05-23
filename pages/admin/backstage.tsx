import {NextPage} from 'next';
import {Menu} from '@arco-design/web-react';
import s from '../../styles/backstage.module.css'

const Backstage: NextPage = () => {
    return (
        <div className={s.wrapper}>
            <Menu
                className={s.menu}
                theme="dark"
                defaultSelectedKeys={['list']}
            >
                <Menu.Item key="list">博客列表</Menu.Item>
            </Menu>
            <main className={s.main}>main</main>
        </div>
    );
};

export default Backstage;
