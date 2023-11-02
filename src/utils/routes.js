import {Home} from "pages/Home";
import { WeOffer } from "pages/WeOffer";
import { OurWork } from "pages/OurWork";
import { ContactUs } from "pages/ContactUs";

const routes = [
    {
        path:'/',
        exact: true,
        component: <Home />
    },
    {
        path:'/home',
        exact: true,
        component: <Home />
    },
    {
        path:'/weOffer',
        exact: true,
        component: <WeOffer/>
    },
    {
        path:'/ourWork',
        exact: true,
        component: <OurWork/>
    },
    {
        path:'/contact-us',
        exact: true,
        component: <ContactUs/>
    }
]

export default routes;

