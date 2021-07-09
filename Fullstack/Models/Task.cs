using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Fullstack.Models
{
    public class ManageTask
    {
        [Key]
        [Required(ErrorMessage = "Не указан ID")]
        public int ID { get; set; }
        [Column(TypeName = "varchar(50)")]
        public string Name { get; set; }
      
        public DateTime Date_Start { get; set; }

        public DateTime Date_Finish { get; set; }
        [Column(TypeName = "varchar(10)")]
        public string Status { get; set; }
        [Column(TypeName = "varchar(200)")]
        public string Task { get; set; }

    }
}
