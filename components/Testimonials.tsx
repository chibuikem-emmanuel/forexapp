"use client";

import { motion } from "framer-motion";
import { testimonials } from "@/lib/data";
import SectionTitle from "./ui/SectionTitle";

export default function Testimonials() {
  return (
    <section className="py-28">
      <div className="container-custom">

        <SectionTitle
          title="What Our Investors Say"
          subtitle="Feedback from users of our platform."
        />

        <div className="grid gap-8 lg:grid-cols-3">
          {testimonials.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, scale: .9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * .2 }}
              viewport={{ once: true }}
              className="rounded-3xl border border-white/10 bg-white/5 p-8"
            >
              <p className="text-gray-300 italic">
                "{item.message}"
              </p>

              <div className="mt-8">
                <h4 className="font-semibold">
                  {item.name}
                </h4>

                <p className="text-sm text-gray-500">
                  {item.role}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}