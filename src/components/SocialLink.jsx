import React from "react";

const SocialLink = ({ href, icon: Icon, label }) => {
  return (
    <a
      href={href}
      className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
      aria-label={label}
      target="_blank"
      rel="noopener noreferrer"
    >
      <Icon className="h-5 w-5 text-gray-600 hover:text-gray-900" />
    </a>
  );
};

export default SocialLink;
