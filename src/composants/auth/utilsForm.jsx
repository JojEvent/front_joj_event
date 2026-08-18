import { useState } from "react";

export const EyeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

export const EyeOffIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </svg>
);

export const GoogleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24">
    <path
      fill="#EA4335"
      d="M5.266 9.765C6.199 6.939 8.854 4.91 12 4.91c1.69 0 3.218.6 4.418 1.582L19.91 3C17.782 1.145 15.055 0 12 0 7.27 0 3.198 2.698 1.24 6.65l4.026 3.115z"
    />
    <path
      fill="#34A853"
      d="M16.04 18.013C14.951 18.716 13.566 19.09 12 19.09c-3.133 0-5.78-2.013-6.723-4.822L1.237 17.335C3.193 21.294 7.265 24 12 24c2.933 0 5.735-1.043 7.834-3.001l-3.794-2.986z"
    />
    <path
      fill="#4A90E2"
      d="M19.834 21C21.96 19.025 23.273 16.212 23.273 12c0-.795-.091-1.564-.255-2.318H12v4.773h6.182c-.313 1.55-1.157 2.779-2.169 3.562L19.834 21z"
    />
    <path
      fill="#FBBC05"
      d="M5.277 14.268A7.12 7.12 0 0 1 4.909 12c0-.782.135-1.533.368-2.235L1.24 6.65A11.934 11.934 0 0 0 0 12c0 1.92.445 3.73 1.237 5.335l4.04-3.067z"
    />
  </svg>
);

export const InputField = ({
  label,
  type = "text",
  placeholder,
  id,
  hasToggle = false,
  onChange,
  value,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-semibold text-gray-900">
        {label}
      </label>
      <div className="relative flex items-center">
        <input
          id={id}
          type={hasToggle ? (showPassword ? "text" : "password") : type}
          placeholder={placeholder}
          className="w-full h-11 px-3 pr-10 border border-black/10 rounded-md text-sm text-gray-900 bg-white placeholder-black/40 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
          onChange={onChange}
          value={value}
        />
        {hasToggle && (
          <button
            type="button"
            className="absolute right-3 text-black/40 hover:text-gray-800 transition"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOffIcon /> : <EyeIcon />}
          </button>
        )}
      </div>
    </div>
  );
};
