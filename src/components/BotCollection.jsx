import BotCard from './BotCard';

const BotCollection = ({ bots, onEnlist }) => {
  return (
    <div className="bot-collection">
      {bots.map(bot => (
        <BotCard 
          key={bot.id} 
          bot={bot} 
          onEnlist={() => onEnlist(bot)} 
        />
      ))}
    </div>
  );
};

export default BotCollection;