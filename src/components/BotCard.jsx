const BotCard = ({ bot, onEnlist }) => {
  // Format stats to match design pattern: VALUE/MODIFIERU[RANDOM]
  const formatStat = (value) => {
    const modifier = Math.floor(value * 0.85);
    const randomCode = Math.floor(Math.random() * 900 + 100)
                      .toString()
                      .padStart(3, '0');
    return `${value} / ${modifier} U ${randomCode}`;
  };

  return (
    <div className="bot-card" onClick={onEnlist}>
      {/* Binary matrix background using catchphrase */}
      <div className="data-matrix">
        {bot.catchphrase.match(/.{1,5}/g)?.join('\n')}
      </div>

      {/* Header section with name and class */}
      <div className="bot-header">
        <h3 className="bot-name">{bot.name}</h3>
        <div className="bot-class">{bot.bot_class}+</div>
      </div>

      {/* Bot avatar image */}
      <img 
        className="bot-avatar" 
        src={bot.avatar_url} 
        alt={bot.name} 
      />

      {/* Stats grid */}
    <div className="stats-grid">
      <div className="stat-item">
          <div className="stat-content">
            <div className="stat-value">
              {formatStat(bot.health)}
            </div>
            <div className="stat-label">INTEGRITY</div>
          </div>
      </div>
      <div className="stat-item">
        <div className="stat-content">
          <div className="stat-value">{formatStat(bot.damage)}</div>
          <div className="stat-label">FIREPOWER</div>
        </div> 
      </div>
      <div className="stat-item">
        <div className="stat-content">
          <div className="stat-value">{formatStat(bot.armor)}</div>
          <div className="stat-label">RESILIENCE</div>
        </div>
      </div>
    </div>

      {/* Footer with catchphrase
      <div className="bot-footer">
        <div>{bot.catchphrase}</div>
      </div> */}
    </div>
  );
};

export default BotCard;