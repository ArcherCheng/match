using System.Collections.Generic;
using System.Linq;

namespace MatchApi.CodeSample
{
    public class Linq1
    {
        
    }
    
    public class Linq2
    {
       static bool IsOdd(int i)
        {
            return i % 2 != 0;
        }
        public void test1()
        {
            int[] intArr = { 10, 9, 8, 7, 6, 5, 4, 3, 2, 1 };

            IEnumerable<int> greaterThanFiveV1 =
            from intItem in intArr
            where intItem >= 5
            select intItem;

            IEnumerable<int> greaterThanFiveV2 = intArr.Where(intItem => intItem >= 5);

            int smallestNumber = intArr.Min();
            int smallestEvenNumber = intArr.Where(n => n % 2 == 0).Min();
            int largestNumber = intArr.Max();
            int largestEvenNumber = intArr.Where(n => n % 2 == 0).Max();
            int sumOfAllNumbers = intArr.Sum();
            int sumOfAllEvenNumbers = intArr.Where(n => n % 2 == 0).Sum();
            int countOfAllNumbers = intArr.Length;
            int countOfAllEvenNumbers = intArr.Where(n => n % 2 == 0).Count();
            double averageOfAllNumbers = intArr.Average();
            double averageOfAllEvenNumbers = intArr.Where(n => n % 2 == 0).Average();

            int intArrProduct1 = 1;
            foreach (int i in intArr)
            {
                intArrProduct1 = intArrProduct1 * i;
            }
            int intArrProduct2 = intArr.Aggregate((a, b) => a * b);

            List<int> intList = new List<int> { 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 };

            IEnumerable<int> intOddV1 = intList.Where(num => IsOdd(num));
            IEnumerable<int> intOddV2 = intList.Where(IsOdd);
            IEnumerable<int> intOddV3 = intList.Where(i => i % 2 != 0);

            IEnumerable<string> oddIntAndIndexStrs = intList
                .Select((intNumber, index) => $"intNumber:{intNumber},index:{index}" );

            IEnumerable<int> oddIndexes = intList
                .Select((num, index) => new { Number = num, Index = index })
                .Where(anonymousObject => anonymousObject.Number % 2 != 0)
                .Select(anonymousObject => anonymousObject.Index);



            string[] gamerNames = { "Name01", "Name02", "Name03", "Name04", "Name05" };

            int minLenth = gamerNames.Min(x => x.Length);
            int maxLenth = gamerNames.Max(x => x.Length);
            // to string,
            string gamerNamesStr1 = string.Empty;
            foreach (string gamerNamesItem in gamerNames)
            {
                if (gamerNamesItem.Equals(gamerNames.Last()))
                {
                    gamerNamesStr1 += gamerNamesItem;
                }
                else
                {
                    gamerNamesStr1 += $"{gamerNamesItem} , ";
                }
            }
            string gamerNamesStr2 = gamerNames.Aggregate((a, b) => $"{a} , {b}");

        }
 
        public class GamerA
        {
            public int Id { get; set; }
            public string Name { get; set; }
            public string Gender { get; set; }
            public override string ToString()
            {
                return $"Id=={Id}, Name=={Name}, Gender=={Gender}";
            }
        }

        public void test2()
        {
            List<GamerA> listGamerA = new List<GamerA>
            {
                new GamerA{Id = 1,Name="Name01",Gender = "Male"},
                new GamerA{Id = 2,Name="Name02",Gender = "Female"},
                new GamerA{Id = 3,Name="Name03",Gender = "Male"},
                new GamerA{Id = 4,Name="Name04",Gender = "Female"},
                new GamerA{Id = 5,Name="Name05",Gender = "Female"}
            };

            IEnumerable<GamerA> allFemaleV1 = from gamer in listGamerA
                                              where gamer.Gender == "Female"
                                              select gamer;

            IEnumerable<GamerA> allFemaleV2 = listGamerA.Where(gamer => gamer.Gender == "Female");

        }



    }

}