import backend from "/back-end-small.png";
import front from "/front-end-small.png";
import sience from "/data-science-small.png";
import devops from "/dev-ops-small.png";
import security from "/security-small.png";

import { MdPostAdd } from "react-icons/md";
import { BsFillFileEarmarkPostFill } from "react-icons/bs";
import telegram from "../../public/icons8-telegram-50.png";
import github from "../../public/icons8-github-50.png";
import linkdin from "../../public/icons8-linkedin-logo-50.png";
export const menuItem = [
  { name: "خانه", link: "/" },
  { name: "مقالات", link: "/postlist" },
  // { name: "دوره ها", link: "/postlist" },
  // { name: "درباره ما", link: "/postlist" },
];

export const Categoryitem = [
  { name: "فرانت اند", link: "frontend", img: front },
  { name: "بک اند", link: "backend", img: backend },
  { name: "علم داده", link: "datasience", img: sience },
  { name: "دواپس", link: "devops", img: devops },
  { name: "امنیت", link: "security", img: security },
];
export const order = [
  { name: "جدیدترین", link: "newest" },
  { name: "قدیمی ترین", link: "oldest" },
];
export const fakeData = [
  {
    title: "آموزش REST API برای جونیورها!",
    desc: "بیایید از یک سناریوی واقعی برای مثال زدن استفاده کنیم. تصور کنید برای سفارش غذا به یک رستوران جدید رفته اید و از آنجایی که قبلاً آنجا نرفته اید، دقیقاً نمی دانید چه نوع غذایی را سرو می کنند",
    category: "frontend",
    img: "https://sokanacademy.s3.ir-thr-at1.arvanstorage.ir/8795/conversions/%D8%A2%D9%85%D9%88%D8%B2%D8%B4-rest-api-%D8%A8%D8%B1%D8%A7%DB%8C-%D8%AC%D9%88%D9%86%DB%8C%D9%88%D8%B1%D9%87%D8%A7-small.webp",
  },
  {
    title: "آموزش REST API برای جونیورها!",
    desc: "بیایید از یک سناریوی واقعی برای مثال زدن استفاده کنیم. تصور کنید برای سفارش غذا به یک رستوران جدید رفته اید و از آنجایی که قبلاً آنجا نرفته اید، دقیقاً نمی دانید چه نوع غذایی را سرو می کنند",
    category: "frontend",
    img: "https://sokanacademy.s3.ir-thr-at1.arvanstorage.ir/8795/conversions/%D8%A2%D9%85%D9%88%D8%B2%D8%B4-rest-api-%D8%A8%D8%B1%D8%A7%DB%8C-%D8%AC%D9%88%D9%86%DB%8C%D9%88%D8%B1%D9%87%D8%A7-small.webp",
  },
  {
    title: "آموزش REST API برای جونیورها!",
    desc: "بیایید از یک سناریوی واقعی برای مثال زدن استفاده کنیم. تصور کنید برای سفارش غذا به یک رستوران جدید رفته اید و از آنجایی که قبلاً آنجا نرفته اید، دقیقاً نمی دانید چه نوع غذایی را سرو می کنند",
    category: "frontend",
    img: "https://sokanacademy.s3.ir-thr-at1.arvanstorage.ir/8795/conversions/%D8%A2%D9%85%D9%88%D8%B2%D8%B4-rest-api-%D8%A8%D8%B1%D8%A7%DB%8C-%D8%AC%D9%88%D9%86%DB%8C%D9%88%D8%B1%D9%87%D8%A7-small.webp",
  },
  {
    title: "آموزش REST API برای جونیورها!",
    desc: "بیایید از یک سناریوی واقعی برای مثال زدن استفاده کنیم. تصور کنید برای سفارش غذا به یک رستوران جدید رفته اید و از آنجایی که قبلاً آنجا نرفته اید، دقیقاً نمی دانید چه نوع غذایی را سرو می کنند",
    category: "frontend",
    img: "https://sokanacademy.s3.ir-thr-at1.arvanstorage.ir/8795/conversions/%D8%A2%D9%85%D9%88%D8%B2%D8%B4-rest-api-%D8%A8%D8%B1%D8%A7%DB%8C-%D8%AC%D9%88%D9%86%DB%8C%D9%88%D8%B1%D9%87%D8%A7-small.webp",
  },
  {
    title: "آموزش REST API برای جونیورها!",
    desc: "بیایید از یک سناریوی واقعی برای مثال زدن استفاده کنیم. تصور کنید برای سفارش غذا به یک رستوران جدید رفته اید و از آنجایی که قبلاً آنجا نرفته اید، دقیقاً نمی دانید چه نوع غذایی را سرو می کنند",
    category: "frontend",
    img: "https://sokanacademy.s3.ir-thr-at1.arvanstorage.ir/8795/conversions/%D8%A2%D9%85%D9%88%D8%B2%D8%B4-rest-api-%D8%A8%D8%B1%D8%A7%DB%8C-%D8%AC%D9%88%D9%86%DB%8C%D9%88%D8%B1%D9%87%D8%A7-small.webp",
  },
];

export const dashLinks = [
  { id: 1, href: "/dashboard/create", icon: MdPostAdd, name: "ساختن" },
  {
    id: 2,
    href: "/dashboard/blogs",
    icon: BsFillFileEarmarkPostFill,
    name: "مقالات",
  },
  // { id: 3, href: "/dashboard/courses", icon: SiApostrophe, name: "دوره ها" },
];

export const userLinks = [
  { id: 1, name: "اطلاعات کاربری", link: "/profile/user-info" },
  { id: 2, name: "مقاله های ذخیره شده", link: "/profile/savepost" },
];

export const imgFooter = [
  { id: 1, img: telegram },
  { id: 2, img: github },
  { id: 3, img: linkdin },
];
