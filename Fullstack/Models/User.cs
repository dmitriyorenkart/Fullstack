using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Fullstack.Models
{
    public class User
    {
        [Key]
        [Required(ErrorMessage = "Не указан ID")]
        [Range(1, 1000000, ErrorMessage = "Недопустимый ID")]
        public int UserID { get; set; }

        [Column(TypeName = "date")]
        [Required(ErrorMessage = "Не указана Дата регистрации")]
        public DateTime Date_Registration { get; set; }
        [Column(TypeName = "date")]
        [Required(ErrorMessage = "Не указана Дата последней активности")]
        public DateTime Date_LastActivity { get; set; }

    }
}
