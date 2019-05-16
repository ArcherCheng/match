using System;

namespace MatchApi.Helpers
{
    public static class DateTimeExtensions
    {
        /// <summary>
        /// yyyy/MM/dd HH:mm
        /// </summary>
        /// <param name="dateTime"></param>
        /// <returns></returns>
        public static string ToFullTimeString(this DateTime dateTime)
        {
            return dateTime.ToString("yyyy/MM/dd HH:mm");
        }

        /// <summary>
        /// yyyy/MM/dd HH:mm
        /// </summary>
        /// <param name="dateTime"></param>
        /// <returns></returns>
        public static string ToFullTimeString(this DateTime? dateTime)
        {
            if (dateTime == null)
            {
                return string.Empty;
            }
            return dateTime.Value.ToFullTimeString();
        }

        /// <summary>
        /// HH:mm
        /// </summary>
        /// <param name="dateTime"></param>
        /// <returns></returns>
        public static string ToTimeString(this DateTime dateTime)
        {
            return dateTime.ToString("HH:mm");
        }

        public static bool IsWeekend(this DateTime date)
        {
            return date.DayOfWeek == DayOfWeek.Saturday || date.DayOfWeek == DayOfWeek.Sunday;
        }
        
        public static DateTime ToSunday(this DateTime date)
        {
            if (date.DayOfWeek == DayOfWeek.Sunday)
            {
                return date.Date;
            }
            return date.Date.AddDays(7 - (int) date.DayOfWeek);
        }
                
        /// <summary>
        /// yyy/MM/dd
        /// </summary>
        /// <param name="dateTime"></param>
        /// <returns></returns>
        public static string ToRocDateString(this DateTime dateTime)
        {
            var year= (dateTime.Year - 1911).ToString(); 
            var mmdd= dateTime.ToString("MM/dd");
            return year+"/"+mmdd;
        }
        public static int CalculateYearsOld(this DateTime theDateTime )
        {
            var years = DateTime.Today.Year - theDateTime.Year;
            if (theDateTime.AddYears(years) > DateTime.Today)
                years--;

            return years;
        }

        public static int CalculateYears(this int theYear )
        {
            var years = DateTime.Today.Year - theYear;

            return years;
        }


        public static int CalculateYears(DateTime startdate, DateTime endDate )
        {
            var years = startdate.Year - endDate.Year;
            if (endDate.AddYears(years) > startdate)
                years--;

            return years;
        }            
    }
}