"use client"
import Image from "next/image";

export default function OrderThanks({ orderName, setOrder }: { orderName: string, setOrder: any }) {
  document.body.style.height = '100vh';

  const closeOrder = () => {
    document.body.style.height = 'auto';
    setOrder(false)
  }

  let styles: React.CSSProperties = {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100%',
    height: '100vh',
    overflow: 'hidden',
    background: '#fff',
    color: '#111',
    zIndex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    textAlign: 'center',
    padding: '0px 1rem 9rem 1rem'
  }

  const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  if (darkModeMediaQuery.matches == true) {
    styles.color = '#fff'
    styles.background = '#222'
  }

  return (
    <div style={styles}>
      <div>
        <Image src="/thanks-msg.svg" width={90} height={90} alt="Thanks" />
        <h3>شكرا جزيلاً على ثقتكم</h3>
      </div>
      <div>
        <h2>{orderName}</h2>
        <h4>نود أن نشكرك على اختيارك لمنتجنا، وسعداء بوجود عميل مثلك لدينا.</h4>
      </div>
      <div>
        <Image src="/thanks-msg.png" width={300} height={175} alt="Thanks" />
        <h5>سيتم الاتصال بك لاحقا لتاكيد طلبك 😊</h5>
      </div>
      <button onClick={closeOrder} type="button">استمر في التسوق</button>
    </div>
  )
}
