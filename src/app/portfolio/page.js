import ImageHandler from '@/components/ImageHandler'
import styles from '@/styles/Portfolio.module.css'
import Image from 'next/image'


export default function Portfolio({ setIvyOpen, setIvyImage, setIvyImageWidth, setIvyImageHeight, setIvyImageDescription }) {
  //TODO: make every "section" have a unique theme/style

  function handleIvyOpen(){
    setIvyOpen()
  }

  function handleIvyImage(imageLocation, imageWidth, imageHeight, imageDescription){
    setIvyImage(imageLocation)
    setIvyImageWidth(imageWidth)
    setIvyImageHeight(imageHeight)
    setIvyImageDescription(imageDescription)
  }

  function handleIvySettings(name){
    switch(name){
      case "astolfo":
        handleIvyImage("Astolfo.webp", 720, 405, `"Astolfo's Scheme" Project`)
        break
      case "placeholder":
        handleIvyImage("placeholderImage.webp", 480, 270, "Placeholder Image")
        break
      }
    handleIvyOpen()
  }

  return (
    <>
      <section className={styles.section1}>
        <section className={styles.section1sub1}>
          <h1 id={styles.title}>The Beginnings of Animation</h1>
          <div id={styles.image}>
            <Image src="Astolfo.webp" width={480} height={270} alt="img" onClick={() => handleIvySettings("astolfo")}/>
          </div>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Numquam error perspiciatis laudantium quod quae debitis, 
            expedita atque eaque reprehenderit ducimus dolore esse veritatis porro sint necessitatibus optio, eveniet saepe accusantium.
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Explicabo libero repudiandae ducimus quia, omnis dolore incidunt ab 
            praesentium recusandae dolores consectetur illum cumque porro aspernatur commodi voluptas temporibus esse animi?
          </p>

          <section className={styles.section1sub2}>
            <div id={styles.image}>
              <Image src="placeholderImage.webp" width={480} height={270} alt="img" onClick={() => handleIvySettings("placeholder")}/>
            </div>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Et quasi ad maxime iste cupiditate deserunt quia nostrum 
              corrupti delectus at, qui nam sapiente dolor, dolores illo iure culpa repudiandae aliquam?
            </p>
          </section>
        </section>
      </section>

      {/* --SECTION DIVIDER-- */}
      <section id={styles.divider}>divider</section>

      <section className={styles.section2}>
        <section className={styles.section2sub1}>
          <h1 id={styles.title}>Death and Java</h1>
          <div id={styles.image}>
              <Image src="placeholderImage.webp" width={480} height={270} alt="img" onClick={() => handleIvySettings("placeholder")}/>
            </div>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Possimus expedita, nihil voluptatem, eligendi molestiae 
            mollitia aliquam ipsam amet reiciendis itaque dolore explicabo beatae tenetur optio dignissimos soluta eveniet odit. Sequi.
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Magnam dolorum quos sunt architecto? Explicabo officiis quo enim ad 
            earum expedita. Id recusandae perspiciatis, dolore voluptatum necessitatibus corporis quod totam sequi?
          </p>
        </section>
      </section>
    </>
  )
}