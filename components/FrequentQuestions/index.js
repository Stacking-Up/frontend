import React, { useState } from "react";
import { Paragraph, Title, Subtitle } from "../../components/Core/Text";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Image from "next/image"

function FAQ() {
    return (
        <>
            <div className="bg-gray-100">
                <div className="container mx-auto">
                    <div role="article" className="bg-gray-100 py-6 md:px-8">
                        <div className="px-4 xl:px-0 pb-10">
                            <div className="flex flex-col lg:flex-row flex-wrap">
                                <div className="lg:mt-0 lg:w-3/5 text-blue-bondi">
                                    <Title>Preguntas frecuentes</Title>
                                </div>
                            </div>
                        </div>
                        <div className="px-6 xl:px-0">
                            <div className="grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 pb-6 gap-8">
                                <div role="cell" className="bg-gray-100">
                                    <div className="bg-white p-5 rounded-md relative h-full w-full border-2 border-blue-bondi">
                                        <div className="text-blue-bondi-dark">
                                            <Subtitle>General</Subtitle>
                                        </div>
                                        <div className="my-5">
                                            <Accordion>
                                                <AccordionSummary
                                                    expandIcon={<ExpandMoreIcon />}
                                                    aria-controls="panel1a-content"
                                                    id="panel1a-header"
                                                >
                                                    <h4 className="text-md text-gray-900 dark:text-gray-100 font-semibold">??Qu?? es Stacking Up?</h4>
                                                </AccordionSummary>
                                                <AccordionDetails>
                                                    <Paragraph>
                                                        Stacking Up es una plataforma intermediaria que pretende resolver los problemas de espacio de las
                                                        personas permitiendo que otros usuarios ganen dinero alquilando el suyo de la forma m??s flexible, segura y eficaz.
                                                    </Paragraph>
                                                </AccordionDetails>
                                            </Accordion>
                                            <Accordion>
                                                <AccordionSummary
                                                    expandIcon={<ExpandMoreIcon />}
                                                    aria-controls="panel1a-content"
                                                    id="panel1a-header"
                                                >
                                                    <h4 className="text-md text-gray-900 dark:text-gray-100 font-semibold">??Por qu?? Stacking Up? </h4>
                                                </AccordionSummary>
                                                <AccordionDetails>
                                                    <Paragraph>
                                                        En Stacking Up priorizamos la facilidad de uso y la seguridad de nuestros usuarios,
                                                        por lo que al usar nuestra plataforma comenzar??s a disfrutar de manera instant??nea, entre algunas otras, de las siguientes caracter??sticas:
                                                        <br></br>
                                                        <br></br>
                                                        <a className="font-semibold">Verificaci??n de usuarios:</a> Al ofertar espacios o alquilar los mismos se le solicitar??n al usuario datos como el n??mero de tel??fono o documentaci??n que permita ofrecer un entorno seguro y eficaz
                                                        <br></br>
                                                        <br></br>
                                                        <a className="font-semibold">Alquiler compartido:</a> ??Por qu?? pagar por espacio que no usas? Stacking Up te permite no solo realizar la reserva de un espacio sino alquilar ??nicamente una parte del mismo. <a className="text-blue-bondi font-semibold">[*]</a>
                                                        <br></br>
                                                        <br></br>
                                                        <a className="font-semibold">B??squeda inteligente:</a> Stacking Up posee un sistema de b??squeda avanzado que te permite encontrar un espacio que se adec??e a tus necesidades rellenando un sencillo formulario personalizado al igual que encontrar inquilinos que tengan necesidades que puedes resolver.
                                                        <br></br>
                                                        <br></br>
                                                        <a className="font-semibold">Alquiler por horas:</a> Como inquilino tendr??s al alcance de tu mano la posibilidad de reservar un espacio seg??n tus necesidades temporales, desde contratos tradicionales por meses hasta reservas por d??as e incluso horas. <a className="text-blue-bondi font-semibold">[*]</a>
                                                        <br></br>
                                                        <br></br>
                                                        <a className="font-semibold">Comisiones:</a> En Stacking Up hemos escuchado a los anfitriones de espacios de los principales portales de la red, y en consecuencia nuestro servicio ofrece las comisiones m??s bajas posibles. Comisiones del 6% para usuarios no premium y del 0% para usuarios premium (suscripci??n indefinida de pago ??nico).
                                                        <br></br>
                                                        <br></br>
                                                        <a className="text-blue-bondi font-semibold">[*]</a> Sujeto a disponibilidad seg??n el espacio y preferencias del anfitri??n
                                                    </Paragraph>
                                                </AccordionDetails>
                                            </Accordion>
                                            <Accordion>
                                                <AccordionSummary
                                                    expandIcon={<ExpandMoreIcon />}
                                                    aria-controls="panel1a-content"
                                                    id="panel1a-header"
                                                >
                                                    <h4 className="text-md text-gray-900 dark:text-gray-100 font-semibold">??Cu??l es la mejor manera de gestionar el intercambio de llaves?</h4>
                                                </AccordionSummary>
                                                <AccordionDetails>
                                                    <Paragraph>
                                                        Recomendamos encarecidamente el uso de nuestro chat para concertar una cita y realizar el intercambio de llaves.
                                                        Otras posibles opciones son el uso de alg??n sistema de terceros como cajetines o locales espec??ficos que ofrecen este tipo de servicios.
                                                    </Paragraph>
                                                </AccordionDetails>
                                            </Accordion>
                                            <Accordion>
                                                <AccordionSummary
                                                    expandIcon={<ExpandMoreIcon />}
                                                    aria-controls="panel1a-content"
                                                    id="panel1a-header"
                                                >
                                                    <h4 className="text-md text-gray-900 dark:text-gray-100 font-semibold">??C??mo gestiona Stacking Up el pago de las reservas? </h4>
                                                </AccordionSummary>
                                                <AccordionDetails>
                                                    <Paragraph>
                                                        Dispondr??s de tres opciones en la pasarela de pago para reservar un espacio. Estas son el pago a trav??s de Paypal, Sofort o usando tu tarjeta de d??bito o cr??dito.
                                                        Para garantizar el cumplimiento de las condiciones acordadas nos hacemos cargo del importe abonado, que se liberar?? al anfitri??n una vez finalizada la reserva.
                                                    </Paragraph>
                                                </AccordionDetails>
                                            </Accordion>
                                        </div>
                                    </div>
                                </div>
                                <div role="cell" className="bg-gray-100">
                                    <div className="bg-white p-5 rounded-md relative h-full w-full border-2 border-blue-bondi">
                                        <div className="text-blue-bondi-dark">
                                            <Subtitle>Inquilinos</Subtitle>
                                        </div>
                                        <div className="my-5">
                                            <Accordion>
                                                <AccordionSummary
                                                    expandIcon={<ExpandMoreIcon />}
                                                    aria-controls="panel1a-content"
                                                    id="panel1a-header"
                                                >
                                                    <h4 className="text-md text-gray-900 dark:text-gray-100 font-semibold">??C??mo convertirme en inquilino?</h4>
                                                </AccordionSummary>
                                                <AccordionDetails>
                                                    <Paragraph>
                                                        Para convertirte en inquilino bastar?? con crearte una cuenta de usuario y completar informaci??n personal b??sica, as?? como m??todos de pago. Una vez hecho esto ya podr??s
                                                        navegar entre los distintos espacios que se oferten en la aplicaci??n y reservar aquel que se adapte a tus necesidades temporales y espaciales, hablar con los anfitriones y realizar la reserva.
                                                    </Paragraph>
                                                </AccordionDetails>
                                            </Accordion>
                                            <Accordion>
                                                <AccordionSummary
                                                    expandIcon={<ExpandMoreIcon />}
                                                    aria-controls="panel1a-content"
                                                    id="panel1a-header"
                                                >
                                                    <h4 className="text-md text-gray-900 dark:text-gray-100 font-semibold">??C??mo y cu??ndo podr?? acceder a mis objetos? </h4>
                                                </AccordionSummary>
                                                <AccordionDetails>
                                                    <Paragraph>
                                                        Podr??s acceder al espacio que est??s alquilando la totalidad del tiempo que dure la reserva de este, estando el instante inicial y final sujeto a disponibilidad horaria del anfitri??n para la entrega de llaves.
                                                    </Paragraph>
                                                </AccordionDetails>
                                            </Accordion>
                                            <Accordion>
                                                <AccordionSummary
                                                    expandIcon={<ExpandMoreIcon />}
                                                    aria-controls="panel1a-content"
                                                    id="panel1a-header"
                                                >
                                                    <h4 className="text-md text-gray-900 dark:text-gray-100 font-semibold">??Puedo hablar con el anfitri??n antes de hacer una reserva? </h4>
                                                </AccordionSummary>
                                                <AccordionDetails>
                                                    <Paragraph>
                                                        Puedes establecer contacto con un anfitri??n a trav??s del chat de Stacking Up de manera previa a la reserva, durante la misma y posteriormente. De igual manera, puedes contactar con el soporte t??cnico de
                                                        Stacking Up para cualquier tipo de incidencia. ??Estaremos encantados de ayudarte!
                                                    </Paragraph>
                                                </AccordionDetails>
                                            </Accordion>
                                            <Accordion>
                                                <AccordionSummary
                                                    expandIcon={<ExpandMoreIcon />}
                                                    aria-controls="panel1a-content"
                                                    id="panel1a-header"
                                                >
                                                    <h4 className="text-md text-gray-900 dark:text-gray-100 font-semibold">??C??mo encuentro un espacio que se adec??e a mis necesidades? </h4>
                                                </AccordionSummary>
                                                <AccordionDetails>
                                                    <Paragraph>
                                                        Tras escuchar a los inquilinos en Stacking Up hemos implementado un sistema de b??squeda inteligente que te permite, a trav??s de un sencillo formulario,
                                                        demandar el espacio que necesitas para encontrar de una manera m??s r??pida el espacio que necesitas sin tener que navegar entre las m??ltiples opciones que existen en la plataforma.
                                                    </Paragraph>
                                                </AccordionDetails>
                                            </Accordion>
                                        </div>
                                    </div>
                                </div>
                                <div role="cell" className="bg-gray-100">
                                    <div className="bg-white p-5 rounded-md relative h-full w-full border-2 border-blue-bondi">
                                        <div className="text-blue-bondi-dark">
                                            <Subtitle>Anfitri??n</Subtitle>
                                        </div>
                                        <div className="my-5">
                                            <Accordion>
                                                <AccordionSummary
                                                    expandIcon={<ExpandMoreIcon />}
                                                    aria-controls="panel1a-content"
                                                    id="panel1a-header"
                                                >
                                                    <h4 className="text-md text-gray-900 dark:text-gray-100 font-semibold">??C??mo convertirme en anfitri??n? </h4>
                                                </AccordionSummary>
                                                <AccordionDetails>
                                                    <Paragraph>
                                                        Para convertirte en anfitri??n bastar?? con crearte una cuenta de usuario y completar informaci??n personal b??sica. Una vez hecho esto, podr??s publicar tu primer espacio subiendo algunas fotos,
                                                        declarando las modalidades de reserva que ofreces, etiquetas predefinidas y adjuntando un t??tulo y una descripci??n. Si quieres mejorar como anfitri??n te recomendamos consultar <a className="font-semibold">?????C??mo aumentar el n??mero de inquilinos????</a>
                                                    </Paragraph>
                                                </AccordionDetails>
                                            </Accordion>
                                            <Accordion>
                                                <AccordionSummary
                                                    expandIcon={<ExpandMoreIcon />}
                                                    aria-controls="panel1a-content"
                                                    id="panel1a-header"
                                                >
                                                    <h4 className="text-md text-gray-900 dark:text-gray-100 font-semibold">??Cu??nto cuesta publicar un espacio? </h4>
                                                </AccordionSummary>
                                                <AccordionDetails>
                                                    <Paragraph>
                                                        ??Absolutamente nada! Podr??s publicar tus espacios de manera gratuita en nuestra aplicaci??n tan r??pido como te pongas manos a la obra. Puedes consultar <a className="font-semibold">?????C??mo convertirme en anfitri??n????</a> para m??s informaci??n al respecto.
                                                    </Paragraph>
                                                </AccordionDetails>
                                            </Accordion>
                                            <Accordion>
                                                <AccordionSummary
                                                    expandIcon={<ExpandMoreIcon />}
                                                    aria-controls="panel1a-content"
                                                    id="panel1a-header"
                                                >
                                                    <h4 className="text-md text-gray-900 dark:text-gray-100 font-semibold">??Cu??nto puedo ganar? </h4>
                                                </AccordionSummary>
                                                <AccordionDetails>
                                                    <Paragraph>
                                                        Tu espacio, tus normas. T?? mismo eres el encargado de fijar los precios de las posibles reservas, tanto por horas, como por d??as, como por meses. StackingUp se lleva una peque??a comisi??n del 6% para anfitriones normales y del 0% para anfitriones premium.
                                                    </Paragraph>
                                                </AccordionDetails>
                                            </Accordion>
                                            <Accordion>
                                                <AccordionSummary
                                                    expandIcon={<ExpandMoreIcon />}
                                                    aria-controls="panel1a-content"
                                                    id="panel1a-header"
                                                >
                                                    <h4 className="text-md text-gray-900 dark:text-gray-100 font-semibold">??Qu?? tendr?? que hacer para recibir los pagos? </h4>
                                                </AccordionSummary>
                                                <AccordionDetails>
                                                    <Paragraph>
                                                        Para recibir tus pagos tendr??s que configurar un m??todo de pago est??ndar como Paypal, Sofort o tarjeta de cr??dito. Tras recibir una reserva el inquilino realiza el pago, que como intermediario almacenamos hasta que finalice la reserva.
                                                        Una vez finalice, se liberar?? el pago al anfitri??n.
                                                    </Paragraph>
                                                </AccordionDetails>
                                            </Accordion>
                                            <Accordion>
                                                <AccordionSummary
                                                    expandIcon={<ExpandMoreIcon />}
                                                    aria-controls="panel1a-content"
                                                    id="panel1a-header"
                                                >
                                                    <h4 className="text-md text-gray-900 dark:text-gray-100 font-semibold">??C??mo aumentar el n??mero de inquilinos? </h4>
                                                </AccordionSummary>
                                                <AccordionDetails>
                                                    <Paragraph>
                                                        Desde nuestra plataforma lamentamos comunicarte que no existe una receta inequ??voca para elevar el n??mero de inquilinos que reserven tu espacio, pero te podemos ofrecer algunos consejos.
                                                        <br></br>
                                                        <br></br>
                                                        <a className="text-blue-bondi font-semibold">1. </a>Verifica tus datos lo antes posible: Cuanto antes confirmemos tu identidad antes podr??s comenzar a recibir inquilinos en tu espacio
                                                        <br></br>
                                                        <br></br>
                                                        <a className="text-blue-bondi font-semibold">2. </a>Completa tu perfil personal: Nada mejor para causar una buena impresi??n que tener la posibilidad de presentarte ante los dem??s. Te recomendamos encarecidamente que a??adas una foto a tu perfil lo antes posible adem??s de tu descripci??n personal para que el resto sepa m??s de ti.
                                                        <br></br>
                                                        <br></br>
                                                        <a className="text-blue-bondi font-semibold">3. </a>Ofrece un buen servicio a tus inquilinos: Cuanto mejor sea el servicio que ofrezcas a tus inquilinos mejores ser??n las valoraciones que estos te dejen en tu perfil. M??s valoraciones implica una mejor percepci??n por parte de posibles inquilinos. ??Lo vas captando?
                                                        <br></br>
                                                        <br></br>
                                                        <a className="text-blue-bondi font-semibold">4. </a>Adquiere la suscripci??n premium de StackingUp: Adquiriendo el servicio premium de StackingUp obtienes entre otras ventajas la eliminaci??n completa de comisiones y prioridad para que tu espacio se publicite en el servicio de b??squeda inteligente.
                                                    </Paragraph>
                                                </AccordionDetails>
                                            </Accordion>
                                        </div>
                                    </div>
                                </div>
                                <div role="cell" className="bg-gray-100">
                                    <div className="bg-white p-5 rounded-md relative h-full w-full border-2 border-blue-bondi">
                                        <div className="text-blue-bondi-dark">
                                            <Subtitle>Si tienes alguna otra duda, no dudes en contactarnos en:</Subtitle>
                                            <br></br>
                                            <div className="text-center">
                                                <Subtitle><a href="mailto:info@stackingup.es">info@stackingup.es</a></Subtitle>
                                            </div>
                                        </div>
                                        <div className="pt-8">
                                            <Image
                                                width={870}
                                                height={310}
                                                className=""
                                                src={`/logolargo.png`}
                                                alt="Im??genes del espacio no encontradas"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default FAQ;