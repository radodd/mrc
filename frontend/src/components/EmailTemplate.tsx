import React from "react";

interface EmailTemplateProps {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  position: string;
  company: string;
  message: string;
  cartItems?: CartItem[];
}

interface CartItem {
  name: string;
  quantity: string;
  category: string;
  size: string;
  image?: string;
}

const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  firstName,
  lastName,
  phoneNumber,
  email,
  position,
  company,
  message,
  cartItems,
}: EmailTemplateProps) => (
  <div>
    <h1>
      {firstName} {lastName} wants to connect!
    </h1>
    <p>Phone Number: {phoneNumber}</p>
    <p>Email: {email}</p>
    <p>position: {position}</p>
    <p>Company: {company}</p>
    <p>Message: {message}</p>
    <h2>Cart Items:</h2>
    {cartItems.length > 0 ? (
      <ul>
        {cartItems.map((item, index) => (
          <li key={index}>
            <strong>{item.name}</strong> - Quantity: {item.quantity} tons
            Category: {item.category}
            <img src={item.image} alt={item.name} width="100" />
          </li>
        ))}
      </ul>
    ) : (
      <p>No cart items available.</p>
    )}
  </div>
);

export default EmailTemplate;
