-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 20-06-2020 a las 11:26:29
-- Versión del servidor: 10.4.11-MariaDB
-- Versión de PHP: 7.4.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `empresa`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `departamento`
--

CREATE TABLE `departamento` (
  `id` int(11) NOT NULL,
  `nombre_departamento` varchar(30) NOT NULL,
  `ciudad` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `departamento`
--

INSERT INTO `departamento` (`id`, `nombre_departamento`, `ciudad`) VALUES
(1, 'direccion', 'Madrid'),
(2, 'financiero', 'Barcelona'),
(3, 'producto', 'Valencia'),
(5, 'administracion', 'Coruña');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `empleados`
--

CREATE TABLE `empleados` (
  `id` int(11) NOT NULL,
  `nombre` varchar(30) NOT NULL,
  `dni` int(9) UNSIGNED ZEROFILL NOT NULL,
  `sexo` enum('M','F','Other') NOT NULL,
  `fecha_nac` date NOT NULL,
  `fecha_inc` timestamp NOT NULL DEFAULT current_timestamp(),
  `salario` int(4) NOT NULL,
  `cargo` varchar(100) NOT NULL,
  `fk_departamento` int(11) NOT NULL,
  `jefe_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `empleados`
--

INSERT INTO `empleados` (`id`, `nombre`, `dni`, `sexo`, `fecha_nac`, `fecha_inc`, `salario`, `cargo`, `fk_departamento`, `jefe_id`) VALUES
(1, 'Lucia', 000056789, 'F', '1980-10-12', '2020-05-27 13:23:51', 2500, 'Jefa de cuentas', 5, 2),
(2, 'Joaquin', 000076543, 'M', '1970-01-12', '2009-01-11 23:00:00', 6000, 'Director administracion', 5, NULL),
(3, 'lastiadef', 000000000, 'M', '1990-10-12', '2004-10-19 22:00:00', 2000, 'gorrilla', 5, 4),
(4, 'Maria', 000543643, 'F', '1976-01-12', '2008-01-11 23:00:00', 6000, 'Director secretaria', 5, NULL),
(5, 'Gema', 000006345, 'F', '1987-10-12', '2004-10-19 22:00:00', 3000, 'contable', 2, 6),
(6, 'Teresa', 000003456, 'F', '1990-01-12', '2019-01-11 23:00:00', 6000, 'Director contable', 2, NULL),
(7, 'Jesus', 000003456, 'M', '1992-10-12', '2020-01-11 23:00:00', 2500, 'Jefa de producto', 3, 8),
(8, 'Elias', 000568768, 'M', '1971-01-12', '2020-05-27 13:23:51', 6000, 'Director producto', 3, NULL),
(9, 'Tamara', 000678876, 'F', '1981-10-12', '2010-01-11 23:00:00', 2500, 'secretaria de direccion', 1, 10);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `departamento`
--
ALTER TABLE `departamento`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `empleados`
--
ALTER TABLE `empleados`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_empleados_departamento_idx` (`fk_departamento`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `departamento`
--
ALTER TABLE `departamento`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT de la tabla `empleados`
--
ALTER TABLE `empleados`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `empleados`
--
ALTER TABLE `empleados`
  ADD CONSTRAINT `fk_empleados_departamento` FOREIGN KEY (`fk_departamento`) REFERENCES `departamento` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
