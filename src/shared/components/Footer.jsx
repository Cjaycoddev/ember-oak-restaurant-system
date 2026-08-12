function Footer() {
    return (
      <footer className="border-t border-zinc-800 bg-zinc-950">
        <div className="container py-12">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div>
              <h2 className="text-2xl text-amber-400">
                Ember & Oak
              </h2>
  
              <p className="mt-2 text-sm text-zinc-400">
                Fire. Flavor. Experience.
              </p>
            </div>
  
            <p className="text-sm text-zinc-500">
              © 2026 Ember & Oak. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    );
  }
  
  export default Footer;