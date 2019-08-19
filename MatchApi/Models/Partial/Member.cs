using System;
using System.Collections.Generic;

namespace MatchApi.Models
{
    public partial class Member : IEntityBase
    {
        public Validation Validate()
        {
            var ValidateSpec = new MemberValidateSpec();
            Validation validation = ValidateSpec.Validate(this);
            return validation;
        }
    }

    public class MemberValidateSpec : IValidateSpec<Member>
    {
        Validation validation = new Validation();
        public Validation Validate(Member entity)
        {
            if (entity.BirthYear > 2000 || entity.BirthYear < 1920)
            {
                string errMessage = "出生年範圍不對";
                validation.AddRule(new ValidationRule(errMessage));
            }

            if (entity.Salary > 5000)
            {
                string errMessage = "年薪最大為5000萬";
                validation.AddRule(new ValidationRule(errMessage));
            }

            if (entity.Heights > 200)
            {
                string errMessage = "身高最大為200公分";
                validation.AddRule(new ValidationRule(errMessage));
            }

            if (entity.Weights > 100)
            {
                string errMessage = "體重最重為120公斤";
                validation.AddRule(new ValidationRule(errMessage));
            }

            return validation;
        }
    }

    public partial class MemberDetail : IEntityBase
    {
        public Validation Validate()
        {
           return new Validation();
        }
    }

    public partial class MemberCondition : IEntityBase
    {
        public Validation Validate()
        {
           return new Validation();
        }
    }
    public partial class MemberPhoto : IEntityBase
    {
        public Validation Validate()
        {
           return new Validation();
        }
    }
    public partial class Liker : IEntityBase
    {
        public Validation Validate()
        {
           return new Validation();
        }
    }
    public partial class Message : IEntityBase
    {
        public Validation Validate()
        {
           return new Validation();
        }
    }
}

