import { addDays, isSameDay } from "date-fns";
import UserInfo from "../../components/User";
import SpacesCarousel from "../../components/SpacesCarousel"
import Booking from "../../components/Booking";
import { Button } from '../../components/Core/Button';
import { useEffect, useState } from "react";
import axios from "axios";
import enumTranslator from "../../public/enumTranslator.json";
import Head from "next/head";

export default function Space(props) {
    if (props.space === "not found") {
        return (
            <div className="h-full flex justify-center items-center">
                <h1 className="text-6xl font-bold text-gray-500 text-center">Space not found</h1>
            </div>
        );
    }

    const [showModal, setShowModal] = useState(false);
    const [type, setType] = useState('HOUR');

    useEffect(() => {
        if (props.space.priceHour) {
            setType('HOUR');
        } else if (props.space.priceDay) {
            setType('DAY');
        } else if (props.space.priceMonth) {
            setType('MONTH');
        }
    }, []);

    return (
        <div className="h-screenC md:bg-gray-100 flex justify-center items-center">
            <Head>
                <title>Informaci&oacute;n del espacio</title>
            </Head>
            <main id="main" className="md:bg-white mb-4 p-5 pl-10 pr-10 md:w-2/3 w-full h-full md:h-3/4 xl:w-1/2 md:min-h-[769px] md:mt-3 md:rounded-xl md:border md:border-[#4aa7c0] relative md:shadow-lg">
                {/* Main body */}
                <article className='flex flex-col h-[90%] lg:h-full'>
                    {/* Title */}
                    <header className='basis-[56px] flex flex-row justify-around'>
                        <h2 className='font-bold shrink-0 text-[25px] md:text-[40px] py-2 text-blue-bondi text-center'>{props.space.name} ({props.space?.dimensions.split('x').reduce((acc, cur) => acc * cur, 1).toFixed(2)} m²) </h2>
                        <p className='sm:font-bold text-sm sm:text-lg md:text-xl py-2 text-blue-bondi text-center flex items-end justify-end'>{props.space?.city}</p>
                    </header>

                    {/* Caroussel and price */}
                    <section className='basis-1/2 relative w-full h-full min-h-[200px]'>
                        <SpacesCarousel slides={props.space.images} />
                        <div className='flex flex-row justify-center absolute bottom-2 left-2'>
                            <div className="text-white font-bold bg-blue-bondi rounded-full p-2 xl:p-5 py-2">
                                {props.space.priceHour && type === 'HOUR' && <h2 className="text-sm xl:text-2xl">{props.space.priceHour} €/hora</h2>}
                                {props.space.priceDay && type === 'DAY' && <h2 className="text-sm xl:text-2xl">{props.space.priceDay} €/día</h2>}
                                {props.space.priceMonth && type === 'MONTH' && <h2 className="text-sm xl:text-2xl">{props.space.priceMonth} €/mes</h2>}
                            </div>
                            {props.space.shared ?
                                <div className="text-white font-bold bg-blue-bondi rounded-full p-2 xl:p-5 py-2 ml-1">
                                    <h2 className="text-sm xl:text-2xl">Espacio compartido</h2>
                                </div> : null
                            }
                        </div>
                    </section>

                    {/* Space data */}
                    <data className='basis-1/2 flex flex-col sm:flex-row pt-3'>

                        {/* User and price selector */}
                        <section className='basis-1/3 flex flex-col'>
                            <UserInfo user={props.owner} ratings={props.ratings} withChat />
                            <div className='basis-[30%] md:basis-1/6 xl:basis-[60%]'>
                                <div className='flex flex-col justify-center md:flex-row md:justify-evenly xl:justify-center items-center lg:items-end xl:items-center h-full w-full'>
                                    <Button type="button" onClick={() => setType('HOUR')} disabled={!props.space.priceHour || type === 'HOUR'} color={type === 'HOUR' ? 'secondary' : 'primary'} className="rounded-3xl h-[30px] my-[2px] w-5/6 md:w-1/4 lg:w-auto flex justify-center items-center mx-0 lg:h-1/3 lg:mx-1 xl:h-1/3 md:disabled:mb-6 disabled:bg-gray-200">H</Button>
                                    <Button type="button" onClick={() => setType('DAY')} disabled={!props.space.priceDay || type === 'DAY'} color={type === 'DAY' ? 'secondary' : 'primary'} className="rounded-3xl h-[30px] my-[2px] w-5/6 md:w-1/4 lg:w-auto flex justify-center items-center mx-0 lg:h-1/3 lg:mx-1 xl:h-1/3 md:disabled:mb-6 disabled:bg-gray-200">D</Button>
                                    <Button type="button" onClick={() => setType('MONTH')} disabled={!props.space.priceMonth || type === 'MONTH'} color={type === 'MONTH' ? 'secondary' : 'primary'} className="rounded-3xl h-[30px] my-[2px] w-5/6 md:w-1/4 lg:w-auto flex justify-center items-center mx-0 lg:h-1/3 lg:mx-1 xl:h-1/3 md:disabled:mb-6 disabled:bg-gray-200">M</Button>
                                </div>
                            </div>
                        </section>

                        {/* Tags and description */}
                        <section className='basis-2/3 flex flex-col h-full'>
                            <div className='basis-1/2 flex flex-col xl:flex-row items-center overflow-auto max-h-[200px]'>
                                <p className='text-blue-bondi h-full'><b>Descripci&oacute;n:&nbsp;</b>{props.space.description}</p>
                            </div>
                            <hr className=" bg-webcolor-50 w-full mx-auto" />
                            <div className='basis-1/2 py-1 shrink-0 overflow-y-auto'>
                                {props.space.tags.map(tag => (
                                    <span key={tag.tag} className="bg-gray-50 text-webcolor-50 border-webcolor-50 border-2 rounded-2xl inline-block px-2 py-1 my-2 mr-2">
                                        {enumTranslator.tags[tag.tag]}
                                    </span>
                                ))}
                            </div>
                        </section>
                    </data>
                </article>
                {/* Rent button */}
                <div className="lg:hidden fixed bottom-0 left-0 right-0 h-[7%] flex justify-center overflow-x-auto whitespace-nowrap my-3 ">
                    <Button type="button" onClick={() => setShowModal(true)} className="bg-webcolor-50 text-white rounded-2xl flex items-center font-bold">
                        +
                    </Button>
                </div>
            </main>
            <menu className="">
                <Booking user={props.user} type={type} setType={setType} rentals={props.rentals} space={props.space} formStyle={"lg:bg-white hidden ml-4 lg:block lg:h-3/4 lg:min-h-[769px] mb-4 p-5 pl-6 pr-6 lg:mt-3 lg:rounded-xl lg:border lg:border-[#4aa7c0] relative lg:shadow-lg min-w-[385px]"} />
                {showModal && (
                    <div className="fixed inset-0 z-50">
                        <div onClick={() => setShowModal(false)} className="absolute inset-0 bg-gray-900 opacity-50" />
                        <header className="absolute z-50 top-0 md:hidden ">
                            <svg onClick={() => setShowModal(false)} xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 m-5 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="#4aa7c0" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </header>
                        <Booking formStyle={"fixed block top-1/2 left-1/2 w-full h-full pt-10 md:pt-0 md:w-[30rem] md:h-3/4 min-h-[550px] bg-white -translate-x-1/2 -translate-y-1/2 md:border-webcolor-50 md:border-2 md:rounded-md  justify-center"} rentals={props.rentals} user={props.user} type={type} setType={setType} space={props.space} />
                    </div>
                )}
            </menu>
        </div>
    )
}

export async function getServerSideProps({ params }) {
    let space, owner, ratings, rentals;
    try {
        space = await axios.get(`${process.env.DATA_API_URL || 'http://localhost:4100'}/api/v1/spaces/${params.id}`).then(async res => {
            let images = await axios.get(`${process.env.DATA_API_URL || 'http://localhost:4100'}/api/v1/spaces/${params.id}/images`).then(imageres => imageres.data).catch(() => { });
            if (images) res.data.images = images;
            return res.data;
        });

        owner = await axios.get(`${process.env.DATA_API_URL || 'http://localhost:4100'}/api/v1/users/${space.ownerId}`).then(async res => {
            let avatar = await axios.get(`${process.env.DATA_API_URL || 'http://localhost:4100'}/api/v1/users/${res.data.id}/avatar`).then(avatarres => avatarres.data).catch(() => { });
            if (avatar) res.data.avatar = avatar;
            return res.data;
        });

        ratings = await axios.get(`${process.env.DATA_API_URL || 'http://localhost:4100'}/api/v1/users/${space.ownerId}/ratings?filter=received`).then(res => res.data).catch(() => []);

        rentals = await axios.get(`${process.env.DATA_API_URL || 'http://localhost:4100'}/api/v1/spaces/${params.id}/rentals`).then(res => {
            let rentals = res.data;
            rentals = rentals.filter(rental => new Date(rental.finalDate) > new Date())
            return rentals
        }).catch(() => { return [] });

    } catch (e) {
        space = "not found";
        owner = {};
        ratings = [];
        rentals = [];
    }

    return {
        props: {
            space: space,
            owner: owner,
            ratings: ratings,
            rentals: rentals
        }
    };
}

