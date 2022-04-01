/* eslint-disable no-nested-ternary */
import axios from 'axios';
import { motion } from 'framer-motion';
import Link from 'next/link';
import React from 'react';
import { useQuery } from 'react-query';
import DataTable from '../components/DataTable';

const allDonars = () => {
    return axios.get('/api/alldonars');
};

function Loading() {
    const variants = {
        parent: {
            initial: {
                opacity: 0,
            },
            animate: {
                opacity: 1,
                transition: {
                    staggerChildren: 0.5,
                },
            },
        },

        child: {
            initial: {
                opacity: 0,
            },
            animate: {
                opacity: 1,
                transition: {
                    duration: 1,
                    repeat: Infinity,
                    repeatDelay: 1,
                },
            },
        },
    };
    return (
        <motion.div
            variants={variants.parent}
            animate="animate"
            initial="initial"
            className="space-x-4 flex justify-center items-center h-[50vh]"
        >
            <motion.span variants={variants.child} className="w-4 h-4 rounded-full bg-slate-700" />
            <motion.span variants={variants.child} className="w-4 h-4 rounded-full bg-slate-700" />
            <motion.span variants={variants.child} className="w-4 h-4 rounded-full bg-slate-700" />
        </motion.div>
    );
}
function donars() {
    const { data, isError, error, isLoading } = useQuery('allDonars', allDonars);

    return (
        <div>
            <div className="p-10 tracking-wider">
                <div className="bg-rose-500 text-sm md:text-base text-white p-5 font-bold">
                    <div className="mb-2 md:mb-0">
                        Most people can donate red blood cells every 120 days, You must wait at
                        least 120 days(4 Month) interval between 2 donations.
                    </div>
                    <div>
                        So Please Check the Last time blood Donation Date & Update it By{' '}
                        <span className=" underline underline-offset-2 hover:text-teal-700 cursor-pointer">
                            <Link href="/login" passHref>
                                Login
                            </Link>
                        </span>
                    </div>
                </div>
            </div>
            {isLoading ? (
                <Loading />
            ) : isError ? (
                <div className="p-10 text-center text-lg tracking-wider text-slate-600">
                    {error?.response?.data?.message}
                </div>
            ) : data?.data?.length > 0 ? (
                <DataTable allData={data?.data} />
            ) : (
                <div className="p-10 text-center text-lg tracking-wider text-slate-600">
                    Not Found, Please Check again later!
                </div>
            )}
        </div>
    );
}

export default donars;
