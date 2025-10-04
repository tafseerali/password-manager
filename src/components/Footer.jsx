import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full bg-gradient-to-r from-sky-200 to-pink-200 border-t border-gray-200 mt-6">
      <div className="max-eighty:w-[95%] eighty:container eighty:w-[65%] mx-auto py-2">
        <div className="flex flex-col items-center gap-1">
          <div className="text-center">
            <p className="text-gray-600 text-sm">
              Created by <span className="font-semibold text-green-500">Tafseer Ali</span>
            </p>
            <p className="text-gray-500 text-xs mt-1">
              This is a personal project
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <span>&copy; {new Date().getFullYear()}</span>
            <span>•</span>
            <span className="font-bold">
              <span className="text-green-500">&lt;</span>Pass<span className="text-green-500">OP/&gt;</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;