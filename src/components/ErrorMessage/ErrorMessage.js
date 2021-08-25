import './ErrorMessage.css';

const ErrorMessage = (props) => {
  return (
    <div className="error-message">{props.text}</div>
  );
};

export default ErrorMessage;
