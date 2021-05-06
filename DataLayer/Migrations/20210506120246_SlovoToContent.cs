using Microsoft.EntityFrameworkCore.Migrations;

namespace DataLayer.Migrations
{
    public partial class SlovoToContent : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Slovo",
                table: "Slovechkos");

            migrationBuilder.AddColumn<string>(
                name: "Content",
                table: "Slovechkos",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Content",
                table: "Slovechkos");

            migrationBuilder.AddColumn<string>(
                name: "Slovo",
                table: "Slovechkos",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
