export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section Placeholder */}
      <div className="bg-navy-900 text-white py-32 px-4 text-center">
        <h1 className="text-5xl md:text-7xl font-serif mb-4 text-gold-500">
          Justice First Law Associates
        </h1>
        <p className="text-2xl urdu-text mb-6">انصاف سب سے پہلے</p>
        <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-300 mb-8">
          Dedicated to providing exceptional legal representation and achieving the best possible outcomes for our clients in Muzaffarabad and beyond.
        </p>
        <div className="flex gap-4 justify-center">
          <button className="bg-gold-500 text-navy-900 px-8 py-3 rounded font-bold hover:bg-gold-300 transition-colors">
            Book Free Consultation
          </button>
          <button className="border border-white text-white px-8 py-3 rounded font-bold hover:bg-white hover:text-navy-900 transition-colors">
            Our Services
          </button>
        </div>
      </div>

      {/* About Preview Placeholder */}
      <section className="py-20 px-4 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="bg-gray-200 aspect-[4/5] rounded-lg"></div>
          <div>
            <h2 className="text-4xl font-serif text-navy-900 mb-6">About Justice First Law Associates</h2>
            <p className="text-lg text-gray-700 mb-6">
              With decades of combined experience, our legal team provides expert counsel across criminal, civil, family, and corporate law. We believe in putting our clients first and fighting tirelessly for their rights.
            </p>
            <p className="urdu-text text-xl text-gray-700 mb-8">
              ہماری قانونی ٹیم دہائیوں کے تجربے کے ساتھ، فوجداری، دیوانی، خاندانی اور کارپوریٹ قانون میں ماہرانہ مشورے فراہم کرتی ہے۔ ہمارا ماننا ہے کہ ہم اپنے مؤکلوں کو ترجیح دیتے ہیں اور ان کے حقوق کے لیے انتھک جدوجہد کرتے ہیں۔
            </p>
            <button className="text-navy-500 font-bold hover:text-gold-500 transition-colors">
              Read More &rarr;
            </button>
          </div>
        </div>
      </section>

      {/* Services Preview Placeholder */}
      <section className="bg-background py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif text-navy-900 mb-4">Our Legal Services</h2>
            <p className="urdu-text text-2xl text-gray-600">ہماری قانونی خدمات</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Criminal Law", titleUr: "فوجداری قانون", desc: "Expert defense in all criminal matters." },
              { title: "Family Law", titleUr: "خاندانی قانون", desc: "Compassionate handling of divorce and custody." },
              { title: "Property Law", titleUr: "پراپرٹی قانون", desc: "Resolving complex real estate disputes." }
            ].map((service, idx) => (
              <div key={idx} className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 hover:border-gold-500 hover:shadow-md transition-all group">
                <h3 className="text-2xl font-serif text-navy-900 mb-2 group-hover:text-gold-500 transition-colors">{service.title}</h3>
                <p className="urdu-text text-xl mb-4 text-gray-600">{service.titleUr}</p>
                <p className="text-gray-700 mb-6">{service.desc}</p>
                <button className="text-navy-500 font-bold text-sm">Learn More</button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
