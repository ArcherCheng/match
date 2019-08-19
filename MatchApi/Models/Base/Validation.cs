using System.Collections.Generic;
using System.Text;

namespace MatchApi.Models
{
    public class Validation
    {
        private List<ValidationRule> _validationRules = new List<ValidationRule>();

        public IEnumerable<ValidationRule> GetRules()
        {
            return _validationRules;
        }

        public void AddRule(ValidationRule rule)
        {
            _validationRules.Add(rule);
        }

    }

    public class ValidationRule
    {
        private string _ruleMessage;

        public ValidationRule(string ruleMessage)
        {
            _ruleMessage = ruleMessage;
        }

        public string RuleMessage
        {
            get { return _ruleMessage; }
        }
    }

    public interface IValidateSpec<TEntity>
        where TEntity : class
    {
        Validation Validate(TEntity entity);
    }
}