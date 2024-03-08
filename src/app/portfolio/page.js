import ImageHandler from '@/components/ImageHandler'
import styles from '@/styles/Portfolio.module.css'
import Image from 'next/image'


export default function Portfolio({setIvyOpen, setIvyImage}) {
  
  function handleIvyOpen(){
    setIvyOpen()
  }

  function handleIvyImage(e){
    setIvyImage(e)
  }

  return (
    <>
      <section className={styles.section1}>
        <h1>The Beginnings of Animation</h1>
        <ImageHandler selectedImage="Astolfo.webp" setOpen={handleIvyOpen} setImage={handleIvyImage}/>
        {/* <Image id={styles.image} src="AstolfoPhotoshoot5(credit).png" width={480} height={270}/> */}
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Numquam error perspiciatis laudantium quod quae debitis, 
          expedita atque eaque reprehenderit ducimus dolore esse veritatis porro sint necessitatibus optio, eveniet saepe accusantium.
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Explicabo libero repudiandae ducimus quia, omnis dolore incidunt ab 
          praesentium recusandae dolores consectetur illum cumque porro aspernatur commodi voluptas temporibus esse animi?
        </p>

        <section className={styles.section2}>
          <ImageHandler selectedImage="placeholderImage.webp" setOpen={handleIvyOpen} setImage={handleIvyImage}/>
          {/* <Image src="placeholderImage.webp" width={400} height={225}/> */}
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Et quasi ad maxime iste cupiditate deserunt quia nostrum 
            corrupti delectus at, qui nam sapiente dolor, dolores illo iure culpa repudiandae aliquam?
          </p>
        </section>
      </section>

      <section className={styles.section3}>
        <h1>Lorem ipsum dolor sit</h1>
        <Image src="placeholderImage.webp" width={400} height={225}/>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Possimus expedita, nihil voluptatem, eligendi molestiae 
          mollitia aliquam ipsam amet reiciendis itaque dolore explicabo beatae tenetur optio dignissimos soluta eveniet odit. Sequi.
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Magnam dolorum quos sunt architecto? Explicabo officiis quo enim ad 
          earum expedita. Id recusandae perspiciatis, dolore voluptatum necessitatibus corporis quod totam sequi?
        </p>
      </section>
    </>
  )
}