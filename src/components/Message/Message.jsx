import "./Message.css";

function Message({ title, description, imageUrl }) {
  return (
    <div className="message">
      <div className="message__container">
        <img src={imageUrl} className="message__image" alt={title} />
        <h2 className="message__title">{title}</h2>
        <p className="message__description">{description}</p>
      </div>
    </div>
  );
}

export default Message;
