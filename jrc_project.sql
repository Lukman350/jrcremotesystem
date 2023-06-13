-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 14, 2022 at 11:26 AM
-- Server version: 10.4.21-MariaDB
-- PHP Version: 7.3.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `jrc_project`
--

-- --------------------------------------------------------

--
-- Table structure for table `auth_tb_user`
--

CREATE TABLE `auth_tb_user` (
  `id` int(11) NOT NULL,
  `nama_lengkap` varchar(128) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(120) NOT NULL,
  `email` varchar(120) NOT NULL,
  `role` int(1) NOT NULL,
  `status_user` int(1) NOT NULL,
  `created_by` int(11) NOT NULL,
  `created_date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `auth_tb_user`
--

INSERT INTO `auth_tb_user` (`id`, `nama_lengkap`, `username`, `password`, `email`, `role`, `status_user`, `created_by`, `created_date`) VALUES
(9, 'Muhammad Zahra', 'mzahra', 'd1537bd0b66a4289001629ac2e06e742', 'mname84@gmail.com', 2, 1, 0, '2022-01-10 11:26:13'),
(37496, 'JRC Admin User', 'root', 'd1537bd0b66a4289001629ac2e06e742', 'mname84+1@gmail.com', 1, 1, 37496, '2022-01-27 08:49:23');

-- --------------------------------------------------------

--
-- Table structure for table `tb_user`
--

CREATE TABLE `tb_user` (
  `id` char(255) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `nama` varchar(120) NOT NULL,
  `email` varchar(100) NOT NULL,
  `created_date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tb_user`
--

INSERT INTO `tb_user` (`id`, `username`, `password`, `nama`, `email`, `created_date`) VALUES
('1', 'root', 'd1537bd0b66a4289001629ac2e06e742', 'Admin', '', '2021-10-06 10:39:22'),
('b5ab27ca-2698-11ec-93d2-f875a45b71ce', 'capt', '2bf67671cd6d0a0938ef60688c1816c7', 'Captain America', 'mzahra1810@gmail.com', '2021-10-06 18:29:52');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `auth_tb_user`
--
ALTER TABLE `auth_tb_user`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tb_user`
--
ALTER TABLE `tb_user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `auth_tb_user`
--
ALTER TABLE `auth_tb_user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37498;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
