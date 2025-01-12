import "./footer.css";
function Footer() {
  return (
    <footer className="footer-container">
      <div className="text-footer">
        <div className="heading-footer">
          <h1>تکنوبلاگ</h1>
          <div className="heading-footer-color"></div>
        </div>
        <p>
          همه‌ی انسان‌ها حق دارند، به آموزش باکیفیت و کم‌هزینه دسترسی آسان داشته
          باشند و همه‌ی افراد می‌توانند با آموزش درست، زندگی فردی و اجتماعی خود
          را بهتر کنند. با توجه به تخصص تیم ما در حوزه‌ی IT و نیاز روزافزون
          بازار کار به متخصصان این حوزه، تولید و عرضه‌ی محتوای مهارت ‌محور و
          تخصصی را در حوزه‌ی IT جدی‌تر دنبال کردیم. در این راه از ابتدای انتخاب
          مسیر متناسب با توانایی و امکانات دانشجو تا یادگیری، تمرین، کسب مهارت
          تخصصی و عمومی، و در نهایت معرفی به بازار کار همراه او هستیم...
        </p>
      </div>
      {/* <div className="img-footer-container">
        {imgFooter.map((item) => (
          <div>
            <img src={item.img} alt={item.img} />
          </div>
        ))}
      </div> */}
    </footer>
  );
}

export default Footer;
