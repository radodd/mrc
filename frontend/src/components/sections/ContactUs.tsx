"use client";
import Image from "next/image";
import { Button } from "../ui/button";

import styles from "../scss/ContactUs.module.scss";

export default function ContactUs({ renderButton }: { renderButton: boolean }) {
  return (
    <div className={styles.contactContainer}>
      <div className={styles.contact}>
        <Image
          src="/work_with_us.png"
          alt=""
          width={1022}
          height={554}
          className={styles.image}
        />

        <div className={styles.body}>
          <h1>Interested in working with us?</h1>
          <p>
            Let us know your project needs and we'll be happy to assist you.
          </p>
          <div className="flex justify-start gap-8">
            <Button variant="outline" navigateTo="/contact">
              Contact Us
            </Button>
          </div>
        </div>
      </div>{" "}
    </div>
  );
}
{
  /* {renderButton && (
            <>
              <Button
                variant="outline"
                navigateTo="/services"
                className={styles.button}
              >
                View Services
              </Button>

              <Button
                variant="outline"
                navigateTo="/materials"
                className={styles.button}
              >
                View Materials
              </Button>
            </>
          )} */
}
