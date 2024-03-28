﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FoodAPI.Models.Models.Dto
{
    public class SellerProfileCreateDTO
    {
        [Required]
        public string Name { get; set; }
        [Required]
        public string Address { get; set; }
        public string? ApplicationUserId { get; set; }
    }
}
