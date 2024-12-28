/* eslint-disable react/prop-types */
import { Input } from "antd";

const CustomInput = ({ 
  icon: Icon, 
  placeholder, 
  className, 
  type = "text", 
  isPassword = false, 
  isTextArea = false, 
  rows = 4, 
  ...rest 
}) => {
  return (
    <div className="w-full">  
      <div className="relative">
        {/* Render TextArea if isTextArea is true */}
        {isTextArea ? (
          <Input.TextArea
            placeholder={placeholder || "Enter text"} // Dynamic placeholder for TextArea
            rows={rows} // Number of rows for TextArea
            className={`w-full px-4 py-2 text-[16px] border border-[#42B244] text-gray-700 rounded-lg resize-none ${className}`} // Custom styling
            {...rest} // Additional props
          />
        ) : isPassword ? (
          <Input.Password
            prefix={Icon && <Icon className="text-gray-500 text-xl" />} // Dynamic icon
            placeholder={placeholder || "Enter password"} // Dynamic placeholder for Password
            className={`w-full px-4 py-2 text-[16px] border border-[#42B244] text-gray-700 rounded-lg ${className}`}
            {...rest} // Additional props
          />
        ) : (
          <Input
            prefix={Icon && <Icon className="text-gray-500 text-xl" />} // Dynamic icon
            placeholder={placeholder || "Enter value"} // Dynamic placeholder
            className={`w-full px-4 py-2 text-[16px] border border-[#42B244] text-gray-700 rounded-lg ${className}`}
            type={type} // Default input type
            {...rest} // Additional props
          />
        )}
      </div>
    </div>
  );
};

export default CustomInput;
