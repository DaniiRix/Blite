import Blite from './Blite';

const Blites = ({ blites }) => {
  return (
    <div className="w-full my-12 mx-auto">
      {blites.map((blite, index) => (
        <Blite key={index} blite={blite} />
      ))}
    </div>
  );
};

export default Blites;
