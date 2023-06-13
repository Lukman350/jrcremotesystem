<div class="page-header">
    <h4 class="page-title"><?= $page_title ?></h4>
    <ul class="breadcrumbs">
        <li class="nav-home">
            <a href="<?= $home_url ?>">
                <i class="flaticon-home"></i>
            </a>
        </li>
        <li class="separator">
            <i class="flaticon-right-arrow"></i>
        </li>

        <?php if ($nav_item_first_title != '') : ?>
            <li class="nav-item">
                <a href="#"><?= $nav_item_first_title ?></a>
            </li>
            <li class="separator">
                <i class="flaticon-right-arrow"></i>
            </li>
        <?php endif; ?>

        <li class="nav-item">
            <a href="<?= $nav_item_second_url ?>"><?= $nav_item_second_title ?></a>
        </li>
    </ul>
</div>