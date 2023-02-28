import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import Filters from '@/components/home/filters'
import Main from '@/components/home/main';

export default function Home() {
    return (
        <div className={styles.app}>
            <Filters />
            <Main />
        </div>
    );
}