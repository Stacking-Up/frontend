import { Button } from "../../components/Core/Button";
import axios from "axios";
import UserInfo from "../../components/User/index.js";
import format from "date-fns/format";
import Link from "next/link";
import { CardMobile } from "../../components/Card/";
import jwt from 'jsonwebtoken';
import Comments from "../../components/Comments/";
import { useState } from "react";
import { VerifyProfile } from "../../components/VerifyProfile";
import { DialogText } from "../../components/Core/Dialog";
import { PayPalButton } from 'react-paypal-button-v2';
import { useRouter } from 'next/router';

async function getRatingComponentData({ query }) {
  const ratings = await axios
    .get(`${process.env.DATA_API_URL || 'http://localhost:4100'}/api/v1/users/${query.id}/ratings`)
    .catch(() => {
      return { data: [] };
    });

  const reviewers = {};

  ratings.data = ratings.data.filter((value) => {
    return value.reviewerId !== parseInt(query.id);
  });

  for (var id in ratings.data) {
    const rating = ratings.data[id];

    const user = await axios
      .get(`${process.env.DATA_API_URL || 'http://localhost:4100'}/api/v1/users/${rating.reviewerId}`)
      .catch(() => {
        return { data: { id: -1, name: "Usuario", surname: "Anónimo" } };
      });

    const ratingId = rating.reviewerId;
    reviewers[ratingId] = {};
    reviewers[ratingId].userName = user.data.name + " " + user.data.surname;
    reviewers[ratingId].userId = user.data.id;
  }
  return { ratingsData: ratings.data || [], reviewers: reviewers || [] };
}

export async function getServerSideProps(context) {

  let userSession;
  try {
    userSession = context.req.cookies.authToken ? jwt.decode(context.req.cookies.authToken) : null;
  } catch (error) {
    userSession = null;
  }

  const { id } = context.params;

  const userData = await axios.get(`${process.env.DATA_API_URL || 'http://localhost:4100'}/api/v1/users/${id}`)
    .then(async res => {
      let avatar = await axios.get(`${process.env.DATA_API_URL || 'http://localhost:4100'}/api/v1/users/${res.data.id}/avatar`).then(avatarres => avatarres.data).catch(() => { });
      if (avatar) res.data.avatar = avatar;
      return res.data;
    }).catch(() => null);

  const spaces = await axios.get(`${process.env.DATA_API_URL || 'http://localhost:4100'}/api/v1/users/${id}/spaces`)
    .then(async res => {
      return await Promise.all(res.data.map(async space => {
        let images = await axios.get(`${process.env.DATA_API_URL || 'http://localhost:4100'}/api/v1/spaces/${space.id}/images`).then(imageres => imageres.data).catch(() => { });
        if (images) space.images = images;
        return space;
      }));
    }).catch(() => []);

  const rentals = await axios.get(`${process.env.DATA_API_URL || 'http://localhost:4100'}/api/v1/users/${id}/rentals`)
    .then(async res => {
      return await Promise.all(res.data.reverse().map(async rental => {
        rental.space = await axios.get(`${process.env.DATA_API_URL || 'http://localhost:4100'}/api/v1/spaces/${rental.spaceId}`)
          .then(async space => {
            let images = await axios.get(`${process.env.DATA_API_URL || 'http://localhost:4100'}/api/v1/spaces/${space.data.id}/images`).then(imageres => imageres.data).catch(() => { });
            if (images) space.data.images = images;
            let ratings = await axios.get(`${process.env.DATA_API_URL || 'http://localhost:4100'}/api/v1/users/${space.data.ownerId}/ratings?filter=received`)
              .then(rat => rat.data).catch(() => { return [] });
            let avgRating = ratings.length > 0 ? ratings.reduce((acc, cur) => acc + cur.rating, 0) / ratings.length : 0;
            space.data.rating = avgRating
            return space.data;
          }).catch(() => []);
        return rental;
      }))
    }).catch((err) => {
      return [];
    });


  const ratings = await axios.get(`${process.env.DATA_API_URL || 'http://localhost:4100'}/api/v1/users/${id}/ratings?filter=received`).then(res => res.data).catch(() => []);

  const avgRating = ratings.length > 0 ? ratings.reduce((acc, cur) => acc + cur.rating, 0) / ratings.length : 0;

  spaces.forEach(space => space.rating = avgRating)

  const prp = await getRatingComponentData(context);
  return {
    props: {
      id: id,
      userData: userData,
      spaces: spaces,
      ratings: ratings,
      rentals: rentals,
      userSession: userSession,
      ratingsData: prp.ratingsData,
      reviewers: prp.reviewers
    },
  };
};

export default function User({ id, userData, spaces, ratings, rentals, userSession, ratingsData, reviewers }) {

  const [infoState, setInfoState] = useState('resume');
  const [openVerified, setOpenVerified] = useState(false);
  const [showModal, setShowModal] = useState(false);

  if (!userData) {
    return (
      <div className="h-full flex justify-center items-center">
        <h1 className="text-6xl font-bold text-gray-500 text-center">Usuario no encontrado</h1>
      </div>
    );
  }


  const router = useRouter();

  async function handlePaymentForPremium() {
    await axios.put(`${process.env.NEXT_PUBLIC_AUTH_API_URL || 'http://localhost:4000'}/api/v1/suscribe`, {},
      {
        withCredentials: true,
      }).then(res => {
        router.reload(window.location.pathname);
      }).catch(err => {
        setShowModal(false);
        alert('El pago se realizó con éxito, pero hubo un problema en servidor. Póngase en contacto con nosotros.');
      });
  }

  return (
    <div className="md:bg-gray-100 flex justify-center items-center">
      <main id='main' className="md:bg-white p-5 pl-10 pr-10 md:w-4/5 w-full h-full md:h-3/4 md:min-h-[769px] md:mt-8 md:mb-8 md:rounded-xl md:border md:border-[#4aa7c0] relative md:shadow-lg">

        <div className="md:flex md:justify-between">
          {
            userSession && userSession.userId === userData.id && userSession.role === 'USER' ?
              <div style={{ margin: "50px 0" }}>
                <Button disabled={!userData.phoneNumber}
                  className={`px-5 py-1 text-xl my-auto rounded transition-colors duration-100 font-semibold flex 
                  items-center space-x-2 border ${userData.phoneNumber ? 'border-blue-bondi text-blue-bondi' : 'border-gray-500 text-gray-500'}`} color="none"
                  onClick={() => {
                    if (userData.phoneNumber)
                      setOpenVerified(true)
                  }}>
                  Verificarse
                </Button>
                {
                  !userData.phoneNumber &&
                  <p className="text-gray-500">
                    *Añada un telefono a su perfil
                  </p>
                }
                {
                  openVerified ?
                    <VerifyProfile phoneNumber={userData.phoneNumber} setOpen={setOpenVerified} /> : null
                }
              </div> : null
          }

          {/* Nombre, foto de perfil, valoración del usuario y botón de chat */}
          <div>
            <UserInfo id={id} user={userData} userSession={userSession} ratings={ratings} />

            {(userSession?.userId === userData?.id || userSession?.role === 'ADMIN') &&
              <div className='flex justify-center'>
                <Link href={`/user/edit/${userData.id}`} passHref>
                  <a>
                    <Button className="px-5 py-1 my-1 text-xl rounded hover:bg-[#34778a] transition-colors duration-100 font-semibold space-x-2" color="secondary">

                      Editar

                    </Button>
                  </a>
                </Link>
              </div>}

            {(userSession?.userId === userData?.id && userSession?.role === 'VERIFIED') && <div className='flex justify-center'>
              <Button onClick={() => setShowModal(true)} className="px-5 py-1 my-1 text-xl rounded hover:bg-[#34778a] transition-colors duration-100 font-semibold space-x-2" color="secondary">
                Pasar a Premium
              </Button>
            </div>}

            {showModal && (
              <DialogText
                title="Pasar a Premium"
                width="small"
                height="small"
                onClickClose={() => setShowModal(false)}
                visibleAcceptButton={false}
                visibleCancelButton={false}>

                <main className="flex flex-col justify-center items-center md:h-full space-y-[5vh] py-10">
                  <div className="flex flex-col justify-center items-center">
                    <p className="md:text-2xl text-xl font-bold text-[#4aa7c0]">Hazte usuario Premium por solo:</p>
                    <p className="p-4 md:text-6xl text-4xl font-bold text-[#4aa7c0]">9.99 €</p>
                    <p className="pb-4 md:text-2xl text-xl font-bold text-[#4aa7c0]">Y disfruta de las siguientes ventajas:</p>

                    <ul className="list-disc text-lg text-[#4aa7c0]">
                      <li>No pagarás comisiones al reservar un espacio.</li>
                      <li>Prioridad en la búsqueda inteligente</li>
                      <p>(tanto de tu perfil como de tus espacios).</p>
                    </ul>

                    <div className="py-[8%]" >
                      <PayPalButton
                        options={{
                          currency: "EUR",
                          clientId: `${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || 'sb'}`
                        }}
                        amount="9.99"
                        onSuccess={(details, data) => {
                          handlePaymentForPremium();
                          return
                        }}
                        onError={console.log("Error in the transaction.")}
                        onCancel={console.log("Transaction cancelled")}
                      />
                    </div>

                  </div>
                </main>

              </DialogText>
            )}

          </div>
          <div className="flex justify-center mt-4">
            <Button className="px-5 py-1 text-xl my-auto rounded hover:bg-[#34778a] transition-colors duration-100 font-semibold flex items-center space-x-2" color="secondary"
              onClick={() => router.push(`/chat?user=${id}`)}>
              <div className="flex items-center justify-center">
                <img src="/images/paperplane.svg" className="w-5 h-5" />
                <p className="ml-2"> Chat</p>
              </div>
            </Button>
          </div>

          <menu className="flex justify-center">
            <fieldset className='p-4 w-full max-w-[250px]'>
              <ul className='grid px-3 w-fit grid-cols-2 font-semibold text-webcolor-50'>
                <li className='border rounded-l border-webcolor-50'>
                  <input className='hidden peer' type="radio" id="RESUME" name="selector" value="resume" checked={infoState === "resume"} onChange={() => setInfoState("resume")} />
                  <label htmlFor="RESUME" className='flex justify-center cursor-pointer transition duration-150 peer-checked:bg-blue-bondi peer-checked:text-white'>
                    Resumen
                  </label>
                </li>
                <li className='border w-fit rounded-r border-webcolor-50 text-center'>
                  <input className='hidden peer' type="radio" id="COMMENTS" name="type" value="comments" checked={infoState === "comments"} onChange={() => setInfoState("comments")} />
                  <label htmlFor="COMMENTS" className='flex px-3 justify-center cursor-pointer transition duration-150 peer-checked:bg-blue-bondi peer-checked:text-white'>
                    Comentarios
                  </label>
                </li>
              </ul>
            </fieldset>
          </menu>
        </div>

        <hr className="my-4" />
        {
          infoState === 'resume' ?
            <>
              {/* Información del usuario */}
              <div className="md:flex md:justify-center">
                {(userData?.birthDate || userData?.location) &&
                  <div id="UserDetails" className="md:w-1/2 flex-col justify-center text-center">
                    <h2 className="text-2xl font-bold mt-4 text-webcolor-50 underline mb-2">
                      Más información acerca de {userData?.name || 'SomeUser'}
                    </h2>
                    {userData?.birthDate &&
                      <div className="flex items-center justify-center relative">

                        <p>Fecha de nacimiento: {format(new Date(userData.birthDate), "dd/MM/yyyy")}</p>

                      </div>
                    }

                    {userData?.location &&
                      <div className="flex items-center justify-center">
                        <p className="ml-2" >Ubicación: {userData.location}</p>
                      </div>
                    }

                  </div>}

                {/* Estadísticas del usuario en la app (número de alquileres y de espacios) */}
                <div id="Stats" className="md:w-1/2 flex-col justify-center text-center">
                  <h2 className="text-2xl font-bold mt-4 mb-2 text-webcolor-50 underline"> Estadísticas</h2>

                  <div className="flex items-center justify-center">
                    <p className="ml-2" >Espacios: {spaces.length}</p>
                  </div>

                  <div className="flex items-center justify-center">
                    <p className="ml-2" >Alquileres: {rentals.length}</p>
                  </div>

                </div>

              </div>

              <hr className="my-4" />

              {/* Lista de espacios del usuario */}
              <h2 className="text-2xl font-bold mt-4 text-webcolor-50 underline mb-2">
                Espacios
              </h2>

              <div className="relative w-full overflow-x-scroll overflow-y-hidden whitespace-nowrap">
                {spaces && spaces.length > 0 ?
                  spaces.map((space, index) => (
                    <div key={'mobile' + index} className="shrink-0 basis-1/4 p-4 px-8 inline-block">
                      <Link href={`/space/${space.id}`} passHref className="w-full h-full">
                        <a className="w-[420px] h-full flex justify-center">
                          <CardMobile
                            space={space}
                          />
                        </a>
                      </Link>

                      {(userSession?.userId === userData?.id || userSession?.role === 'ADMIN') &&

                        <Link href={`/publish/edit/${space.id}`} passHref><a>
                          <Button className="px-5 py-1 my-1 text-xl rounded hover:bg-[#34778a] transition-colors duration-100 font-semibold space-x-2" color="secondary">
                            Editar
                          </Button>
                        </a></Link>
                      }
                    </div>
                  )) : <h1 className="h-full w-full min-h-[200px] flex items-center justify-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-center text-gray-500">Sin resultados</h1>}
              </div>

              {(userSession?.userId === userData?.id || userSession?.role === 'ADMIN') &&
                <>
                  <hr className="my-4" />

                  {/* Lista de espacios que el usuario ha alquilado recientemente */}
                  <h2 className="text-2xl font-bold mt-4 text-webcolor-50 underline mb-2">
                    Alquileres recientes
                  </h2>
                  <div className="relative w-full overflow-x-scroll overflow-y-hidden whitespace-nowrap">
                    {rentals && rentals.length > 0 ?
                      rentals.map((rental, index) => (
                        <div key={'mobile' + index} className="shrink-0 basis-1/4 p-4 px-8 inline-block relative">
                          <Link href={`/space/${rental.space.id}`} passHref className="w-full h-full">
                            <a className="w-[420px] h-full flex justify-center">
                              <CardMobile
                                space={rental.space}
                              />
                            </a>
                          </Link>
                          {
                            rental.type === 'HOUR' ?
                              <p className="absolute top-5 right-0 left-0 text-center text-lg text-blue-bondi font-bold" style={{ textShadow: '2px 0 0 #fff, -2px 0 0 #fff, 0 2px 0 #fff, 0 -2px 0 #fff, 1px 1px #fff, -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff' }}>
                                {`${new Date(rental.initialDate).toLocaleDateString('es-ES', { year: '2-digit', month: '2-digit', day: '2-digit' })} `}
                                {`${new Date(rental.initialDate).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })} `}
                                -
                                {` ${new Date(rental.finalDate).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })} `}
                              </p>
                              :
                              <p className="absolute top-5 right-0 left-0 text-center text-lg text-blue-bondi font-bold" style={{ textShadow: '2px 0 0 #fff, -2px 0 0 #fff, 0 2px 0 #fff, 0 -2px 0 #fff, 1px 1px #fff, -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff' }}>
                                {`${new Date(rental.initialDate).toLocaleDateString('es-ES', { year: '2-digit', month: '2-digit', day: '2-digit' })} `}
                                -
                                {` ${new Date(rental.finalDate).toLocaleDateString('es-ES', { year: '2-digit', month: '2-digit', day: '2-digit' })} `}
                              </p>
                          }

                        </div>
                      )) : <h1 className="h-full w-full min-h-[200px] flex items-center justify-center text-xl sm:text-2xl md:text-3xl lg:text-4xl text-center text-gray-500">Sin resultados</h1>}
                  </div>
                </>}
            </> :
            <>
              <Comments userId={id} loggedUserId={userSession ? userSession.userId : -1} ratings={ratingsData} reviewers={reviewers} userUrl="/user/${id}" loggedIn={!!userSession} />
            </>
        }
      </main >
    </div >
  )
};


