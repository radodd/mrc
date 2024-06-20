"use client";
import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";

import styles from "../scss/ContactUs.module.scss";

export default function ContactUs({ renderButton }: { renderButton: boolean }) {
  return (
    <div className="flex justify-center w-full bg-tanbase ">
      <div className={` ${styles.contact}`}>
        <div className="">
          <Image src="/work_with_us.png" alt="" width={1022} height={554} />
        </div>
        <div className={styles.body}>
          <h1>Interested in working with us?</h1>
          <p>
            Lúthien ielvathren, ithil arnath ar valinor. Aerlinn irína, hiril
            alda ar lúthalion."
          </p>
          <div className="flex justify-start gap-8">
            {/* {renderButton && (
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
          )} */}

            <Button variant="outline" navigateTo="/contact">
              Contact Us
            </Button>
          </div>
        </div>
      </div>{" "}
    </div>
  );
}
